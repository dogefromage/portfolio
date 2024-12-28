import React, { PropsWithChildren } from 'react';
import { getGithubPages } from '../utils/githubPageToMarkdown';
import Link from 'next/link';
import Email from '../components/Email';

interface Props {

}

const Nav = async ({}: PropsWithChildren<Props>) => {
  const pages = await getGithubPages();

  return (
    <nav className="w-1/3 h-full sticky top-8 pr-2">
      <div className="flex flex-col">
        <Link href='/'>Home</Link>
        <p className="text-accent">Projects</p>
        <div className="pl-4 flex flex-col">
          <Link href='/p/measuring_speed_of_light'>Measuring the speed of light</Link>
          <Link href='/p/minimoog_clone'>Minimoog synthesizer clone</Link>
          <Link href='/p/polyphonic_analog_synthesizer'>Roland juno clone</Link>
          {
            pages.map(page =>
              <Link key={page.repo} href={`/p/${page.repo}`}>{page.repo}</Link>
            )
          }
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <h4 className="text-accent">Contact</h4>
        <Email />
        <a href="https://www.linkedin.com/in/sebastian-saner-5b1178229/" target="_blank">linkedin/sebastian-saner</a>
        <a href="https://github.com/dogefromage" target="_blank">github/dogefromage</a>
      </div>
    </nav>
  );
}

export default Nav;