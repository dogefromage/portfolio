import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

const SMALL_IMAGE_SUFFIX = '#small';

/**
 * Turns a paragraph containing only an image into a figure:
 * ![alt](/image.jpg "caption") or ![alt](/image.jpg#small "caption")
 */
function rehypeFigures() {
    return (tree: any) => {
        visit(tree, 'element', (node: any, index: any, parent: any) => {
            const img = node.children[0];
            if (node.tagName !== 'p' || node.children.length !== 1 || img.tagName !== 'img') {
                return;
            }

            const { src, title, ...properties } = img.properties;
            const small = src.endsWith(SMALL_IMAGE_SUFFIX);
            img.properties = { ...properties, src: small ? src.slice(0, -SMALL_IMAGE_SUFFIX.length) : src };

            const children = [img];
            if (title) {
                children.push({
                    type: 'element',
                    tagName: 'figcaption',
                    properties: {},
                    children: [{ type: 'text', value: title }],
                });
            }
            parent.children[index] = {
                type: 'element',
                tagName: 'figure',
                properties: small ? { className: ['small'] } : {},
                children,
            };
        });
    };
}

const GITHUB_FILE_URL = /^https:\/\/github\.com\/([^/]+\/[^/]+)\/(?:blob|raw)\/([^?#]+).*$/;

/** Points relative image urls and github.com file urls in a README at the raw files. */
function rehypeAbsoluteImages({ baseUrl }: { baseUrl: string }) {
    return (tree: any) => {
        visit(tree, 'element', (node: any) => {
            const src = node.properties.src;
            if (node.tagName !== 'img' || !src) {
                return;
            }
            node.properties.src = /^([a-z]+:|\/\/)/i.test(src)
                ? src.replace(GITHUB_FILE_URL, 'https://raw.githubusercontent.com/$1/$2')
                : `${baseUrl}/${src.replace(/^\.?\//, '')}`;
        });
    };
}

function markdownParser() {
    return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw);
}

/** For content in this repo, so raw html like iframes is allowed. */
export async function localMarkdownToHtml(markdown: string) {
    const result = await markdownParser()
        .use(rehypeFigures)
        .use(rehypeStringify)
        .process(markdown);
    return result.toString();
}

/** For READMEs fetched at runtime, so html is sanitized. */
export async function githubMarkdownToHtml(markdown: string, baseUrl: string) {
    const result = await markdownParser()
        .use(rehypeSanitize)
        .use(rehypeAbsoluteImages, { baseUrl })
        .use(rehypeStringify)
        .process(markdown);
    return result.toString();
}
