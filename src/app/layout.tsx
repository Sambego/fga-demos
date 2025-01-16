import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Github, BookOpenText } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenFGA Booth Demo",
  description: "A quick demonstration of OpenFGA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(
    process.env.FGA_API_URL,
    process.env.FGA_MODEL,
    process.env.FGA_STORE
  );
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {children}
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <a
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-transparent text-primary-background shadow hover:bg-secondary/90 h-9 px-4 py-2"
              href="https://openfga.dev/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpenText />
              OpenFGA documentation
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              href="https://github.com/openfga"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              View the code on GitHub →
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
