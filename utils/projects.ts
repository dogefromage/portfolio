import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');
const PAGE_TTL = 300; // 5 minutes

export interface GithubSource {
    user: string;
    repo: string;
    branch: string;
};

export interface Project {
    slug: string;
    title: string;
    navTitle: string;
    year: string;
    body: string;
    github?: GithubSource;
};

async function readProject(filename: string): Promise<Project> {
    const { data, content } = matter(await readFile(path.join(PROJECTS_DIR, filename), 'utf8'));
    if (!data.title || !data.year) {
        throw new Error(`${filename}: frontmatter needs a title and a year.`);
    }

    let github: GithubSource | undefined;
    if (data.github) {
        const [user, repo] = data.github.split('/');
        github = { user, repo, branch: data.branch ?? 'main' };
    }

    return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        navTitle: data.navTitle ?? data.title,
        year: String(data.year),
        body: content,
        github,
    };
}

/** All projects, newest first. */
export async function getProjects(): Promise<Project[]> {
    const filenames = (await readdir(PROJECTS_DIR)).filter(name => name.endsWith('.md'));
    const projects = await Promise.all(filenames.map(readProject));
    return projects.sort((a, b) => b.year.localeCompare(a.year) || a.slug.localeCompare(b.slug));
}

export async function getProject(slug: string): Promise<Project | undefined> {
    return (await getProjects()).find(project => project.slug === slug);
}

export async function fetchGithubReadme({ user, repo, branch }: GithubSource): Promise<string> {
    const url = `${githubContentUrl({ user, repo, branch })}/README.md`;
    const response = await fetch(url, { next: { revalidate: PAGE_TTL } });
    if (!response.ok) {
        throw new Error(`Failed to fetch file from GitHub: ${response.statusText}`);
    }
    return response.text();
}

export function githubContentUrl({ user, repo, branch }: GithubSource): string {
    return `https://raw.githubusercontent.com/${user}/${repo}/${branch}`;
}
