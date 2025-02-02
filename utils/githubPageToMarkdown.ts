import { remark } from 'remark';
import html from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import rehypeRewrite from 'rehype-rewrite';

const PAGE_TTL = 300; // 5 minutes

interface GithubPage { 
    displayName: string;
    date: string;
    repo: string;
    branch: string; 
    user: string;
};


export async function fetchGitHubMarkdown(url: string): Promise<string> {
    const response = await fetch(url, { next: { revalidate: PAGE_TTL } });
    if (!response.ok) {
        throw new Error(`Failed to fetch file from GitHub: ${response.statusText}`);
    }
    return response.text();
}

function parseArguments(input: string): string[] {
    const regex = /\"(.*?)\"|(\S+)/g;
    const matches = [...input.matchAll(regex)];
    return matches.map(match => match[1] ?? match[2]);
}

export async function getGithubPages(): Promise<GithubPage[]> {
    const url = 'https://raw.githubusercontent.com/dogefromage/repo-cms-data/refs/heads/master/data.txt';
    const raw = await (await fetch(url, { next: { revalidate: PAGE_TTL } })).text();
    const pages = raw
        .split('\n')
        .map(x => x.trim())
        .filter(x => x.length)
        .map(parseArguments)
        .map(([repo, user, branch, displayName, date]) => ({ repo, user, branch, displayName, date }));
    console.log(pages);
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