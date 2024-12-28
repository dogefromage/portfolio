import { remark } from 'remark';
import html from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import rehypeRewrite from 'rehype-rewrite';

const QUERY_REVALIDATION_TIME = 3600; // once every hour

interface GithubPage { user: string, branch: string, repo: string }


export async function fetchGitHubMarkdown(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch file from GitHub: ${response.statusText}`);
    }
    return response.text();
}

export async function getGithubPages(): Promise<GithubPage[]> {
    const url = 'https://raw.githubusercontent.com/dogefromage/repo-cms-data/refs/heads/master/data.txt';
    const raw = await (await fetch(url, { next: { revalidate: QUERY_REVALIDATION_TIME } })).text();
    const pages = raw
        .split('\n')
        .map(line => line.split(' '))
        .map(([repo, user, branch]) => ({ repo, user, branch }));
    // console.log(pages);
    return pages;
}

export async function getGithubPageData(key: string) {
    const pages = await getGithubPages();
    const page = pages.find(page => page.repo === key);
    if (!page) {
        throw new Error(`Page not found.`);
    }
    return page;
}

export async function markdownToHtml(markdown: string, baseUrl: string) {
    const result = await remark()
        .use(html)
        .use(rehypeHighlight)
        .use(rehypeRewrite, {
            rewrite: (node: any) => {
                if (node.type === 'image' && node.url) {
                    if (!node.url.startsWith('http') && !node.url.startsWith('//')) {
                        node.url = baseUrl + node.url;
                    }
                }
            },
        })
        .process(markdown);
    return result.toString();
}