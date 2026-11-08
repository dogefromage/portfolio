import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "../utils/projects";

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <div className="md-prose">
      {/* same columns as the projects below, so the image lines up with the third project */}
      <div className="grid sm:grid-cols-3 gap-3  mb-10">
        <div className="sm:col-span-2 min-w-0">
          <h1>Hey! I'm Sebastian</h1>
          <p>I study robotics at ETH Zürich. I make electronic projects and program things.</p>
        </div>

        <Image className="w-full h-auto" src="/snow-img_33.jpg" alt="Image of me"
          width={1014} height={1352} sizes="(min-width: 640px) 25vw, 100vw" />
      </div>

      <h2 className="text-accent">Cool stuff...</h2>
      <div className="grid sm:grid-cols-3 gap-6 sm:gap-3 mt-3">
        {
          projects.map(project => (
            <Link key={project.slug} href={`/p/${project.slug}`}
              className="flex flex-col gap-3 items-start">
              {project.thumbnail && (
                <Image className="w-full aspect-square object-cover" src={project.thumbnail}
                  alt="" width={480} height={480} sizes="(min-width: 640px) 25vw, 100vw" />
              )}
              <span>
                {/* <span className="text-accent">[{project.year}] </span> */}
                {project.navTitle}
              </span>
            </Link>
          ))
        }
      </div>
    </div>
  );
}
