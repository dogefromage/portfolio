import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { getGithubPages } from '../utils/githubPageToMarkdown';
import Email from './Email';

interface NavPage { 
  displayName: string;
  date: string;
  slug: string;
};


const customPages: NavPage[] = [
  { displayName: 'Measuring the speed of light', date: '2019', slug: 'measuring_speed_of_light'},
  { displayName: 'Minimoog synthesizer clone', date: '2020', slug: 'minimoog_clone' },
  { displayName: 'Roland juno clone', date: '2025', slug: 'polyphonic_analog_synthesizer' },
]

interface Props {

}

const Nav = async ({}: PropsWithChildren<Props>) => {
  const githubPages = await getGithubPages();

  const allPages = customPages.concat(githubPages
    .map(({ displayName, date, repo }) => ({ displayName, date, slug: repo })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const seenDates = new Set<string>();
  const pagesWithNewDates = allPages.map(page => {
    if (seenDates.has(page.date)) {
      return {
        ...page,
        dateSeen: true,
      };
    } else {
      seenDates.add(page.date);
      return {
        ...page,
        dateSeen: false,
      };
    }
  });

  return (<>
    <nav className="flex flex-col">
      <Link href='/'>Home</Link>
      <p className="text-accent">Projects</p>
      <div className="pl-4 flex flex-col">
        {/* <Link href='/p/measuring_speed_of_light'>Measuring the speed of light</Link>
        <Link href='/p/minimoog_clone'>Minimoog synthesizer clone</Link>
        <Link href='/p/polyphonic_analog_synthesizer'>Roland juno clone</Link> */}
        {
          pagesWithNewDates.map(page => {
            const dateStyle = page.dateSeen ? 'invisible' : '';
            return (
              <Link key={page.slug} href={`/p/${page.slug}`}>
                <span className={"text-accent " + dateStyle}>[{ page.date }] </span>
                {page.displayName}
              </Link>
            );
          })
        }
      </div>
    </nav>
    <aside className="flex flex-col mt-8">
      <h4 className="text-accent">Contact</h4>
      <Email />
      <a href="https://www.linkedin.com/in/sebastian-saner-5b1178229/" target="_blank">linkedin/sebastian-saner</a>
      <a href="https://github.com/dogefromage" target="_blank">github/dogefromage</a>
    </aside>
  </>);
}

export default Nav;