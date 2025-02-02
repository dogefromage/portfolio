import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import Background from "../components/Background";
import "./globals.scss";
import Nav from "../components/Nav";

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sebastian Saner",
  description: "Sebastian Saner",
  icons: {
    icon: '/favicon.png', // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      {/* <Head>
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
      </Head> */}
      <body className={`w-full min-h-dvh px-4 pt-20 overflow-y-scroll overflow-x-hidden relative z-0 ${roboto_mono.className}`}>

        <div className="fixed w-full h-full -z-10 top-0 left-0 pointer-events-none">
          <Background />
        </div>

        <main className="flex mx-auto max-w-[1400px] z-10">
          <div className="w-1/3 h-full sticky top-8 pr-2 r-nav">
            <Nav />
          </div>

          <article className="w-2/3 mb-4 r-article">
            {children}
          </article>
        </main>

        <footer className="flex w-full justify-center items-center p-2 mb-4 z-20">
          <p>&copy; {new Date().getFullYear()} Sebastian Saner</p>
        </footer>
      </body>
    </html>
  );
}
