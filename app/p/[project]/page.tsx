import { fetchGitHubMarkdown, getGithubPageData, markdownToHtml } from '../../../utils/githubPageToMarkdown';

export default async function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
  try {
    const { user, repo, branch } = await getGithubPageData((await params).project);
    // console.log(user, repo, branch);

    const contentUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}`;
    // console.log(contentUrl);

    const markdownUrl = `${contentUrl}/README.md`;
    const markdown = await fetchGitHubMarkdown(markdownUrl);
    const content = await markdownToHtml(markdown, contentUrl);

    return (<>
      <h1 className='text-2xl mb-8'>
        <a href={`https://github.com/${user}/${repo}`}>
          {`github/${user}/${repo}`}
          <span className='text-accent'>/README.md</span>
        </a>
      </h1>
      <div className="md-prose" 
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