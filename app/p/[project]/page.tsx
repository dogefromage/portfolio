import { notFound } from 'next/navigation';
import ImageLightbox from '../../../components/ImageLightbox';
import { githubMarkdownToHtml, localMarkdownToHtml } from '../../../utils/markdown';
import { fetchGithubReadme, getProject, getProjects, githubContentUrl, Project } from '../../../utils/projects';

export const revalidate = 300; // 5 minutes

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ project: slug }));
}

async function GithubProject({ project: { year, github } }: { project: Project }) {
  const { user, repo } = github!;

  try {
    const markdown = await fetchGithubReadme(github!);
    const content = await githubMarkdownToHtml(markdown, githubContentUrl(github!));

    return (<>
      <h1 className='text-2xl mb-8 break-all'>
        <span className="text-accent">[{year}] </span>
        <a href={`https://github.com/${user}/${repo}`}>
          {`github/${user}/${repo}`}
          <span className='text-accent'>/README.md</span>
        </a>
      </h1>
      <div className="md-prose zoomable"
        dangerouslySetInnerHTML={{ __html: content }} />
    </>)
  }
  catch (e) {
    console.error(e);
    return (<>
      <h1>Sorry!</h1>
      <p>Error on rendering or page not found</p>
    </>);
  }
}

async function LocalProject({ project: { year, title, body } }: { project: Project }) {
  const content = await localMarkdownToHtml(body);

  return (
    <div className="md-prose">
      <h1 className='text-2xl mb-8'>
        <span className="text-accent">[{year}] </span>
        {title}
      </h1>
      <div className="zoomable" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
  const project = await getProject((await params).project);
  if (!project) {
    notFound();
  }

  return (<>
    {project.github
      ? <GithubProject project={project} />
      : <LocalProject project={project} />}
    <ImageLightbox />
  </>);
}
