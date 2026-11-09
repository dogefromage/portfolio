import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { getProjects } from '../utils/projects';
import Email from './Email';

interface Props {

}

const Nav = async ({}: PropsWithChildren<Props>) => {
  const projects = await getProjects();

  const seenDates = new Set<string>();
  const pagesWithNewDates = projects.map(page => {
    if (seenDates.has(page.year)) {
      return {
        ...page,
        dateSeen: true,
      };
    } else {
      seenDates.add(page.year);
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
        {
          pagesWithNewDates.map(page => {
            const dateStyle = page.dateSeen ? 'invisible' : '';
            return (
              <Link key={page.slug} href={`/p/${page.slug}`}>
                <span className={"text-accent " + dateStyle}>[{page.year}] </span>
                {page.navTitle}
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
