// assembly_1.jpg  
// assembly_2.jpg  
// assembly_3.jpg  
// finished.jpg

function Image({ image, alt, desc, width }: { image: string, alt: string, desc?: string, width?: string }) {

    width ||= "w-3/4";

    return (
        <figure className={"mx-auto my-4 " + width}>
            <img alt={alt} src={image} />
            {desc && <figcaption>{desc}</figcaption>}
        </figure>
    )
}


export default function Compass() {

    return (
        <div className="md-prose">
            <h1 className='text-2xl mb-8'> <span className="text-accent">[2026] </span> Compass</h1>

            <p className="text-lg">
                <a href="https://github.com/dogefromage/compass">Source Code on GitHub</a>
            </p>

            <div className="w-full my-8">
                <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/J7OHfNbIT3I" title="I Overengineered a Compass using MAGNETS" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

            Something I have always wanted to build... I underestimated the amount of control systems and world coordinate systems required to make something like this work.

            <Image image="/compass/finished.jpg" alt="Finished compass" desc="The finished compass after assembly" />
            <Image image="/compass/assembly_1.jpg" alt="Assembly 1" width="w-2/4" />
            <Image image="/compass/assembly_2.jpg" alt="Assembly 2" width="w-2/4" />
            <Image image="/compass/assembly_3.jpg" alt="Assembly 3" width="w-2/4" />

        </div>
    );
}
