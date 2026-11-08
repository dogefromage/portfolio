

function Image({ image, alt, desc, width }: { image: string, alt: string, desc?: string, width?: string }) {

    width ||= "w-3/4";

    return (
        <figure className={"mx-auto my-4 " + width}>
            <img alt={alt} src={image} />
            {desc && <figcaption>{desc}</figcaption>}
        </figure>
    )
}

export default function () {

    return (
        <div className="md-prose">
            <h1 className='text-2xl mb-8'>
                <span className="text-accent">[2025] </span>
                Building a 1980s 8-voice analog synthesizer inspired by the Roland Juno
            </h1>

            <Image image="/compass/finished.jpg" alt="Finished compass" desc="The finished compass after assembly" />
        </div>
    );
}
