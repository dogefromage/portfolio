import Image from "next/image";

export default function Home() {
  return (
    <div className="md-prose">
        <h1>Hey! I'm Sebastian</h1>
        <p>I study computer science at ETH Zürich and I make electronic projects and program things.</p>
        <Image src="/snow-img_33.jpg" alt="Image of me" width={1014} height={1352}></Image>
    </div>
  );
}
