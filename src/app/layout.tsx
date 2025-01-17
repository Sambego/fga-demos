import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Github,
  BookOpenText,
  HardDrive,
  PiggyBank,
  Wand,
  HeartPulse,
  Bot,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex border-b-[1px] border-gray-200 p-4 justiufy-end">
          <div className="w-[800px] mx-auto">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <img
                    src="/openfga-logo.svg"
                    alt="The OpenFGA Logo"
                    className="w-10"
                  />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Wand className="inline mr-2" /> OpenFGA Demos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[600px]">
                      <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link href="/" passHref legacyBehavior>
                          <NavigationMenuLink>
                            <div className="text-sm font-medium leading-non">
                              <p className="text-xl font-bold tracking-wide">
                                <HardDrive className="inline mr-2" />
                                FGA Drive
                              </p>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Share your online files with other members in your
                              organization.
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link href="/bank" passHref legacyBehavior>
                          <NavigationMenuLink>
                            <div className="text-sm font-medium leading-non">
                              <p className="text-xl font-bold tracking-wide">
                                <PiggyBank className="inline mr-2" />
                                FGA Bank
                              </p>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Manage the bank accounts of your children until
                              they turn 18 years old.
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <Link href="/health" passHref legacyBehavior>
                          <NavigationMenuLink>
                            <div className="text-sm font-medium leading-non">
                              <p className="text-xl font-bold tracking-wide">
                                <HeartPulse className="inline mr-2" />
                                FGA Health
                              </p>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Doctors can manage all health records of their
                              patients. Parents can view those of their
                              children.
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground text-muted-foreground">
                        <Link href="/" passHref legacyBehavior>
                          <NavigationMenuLink className="cursor-not-allowed">
                            <div className="text-sm font-medium leading-none">
                              <p className="text-xl font-bold tracking-wide">
                                <Bot className="inline mr-2" />
                                FGA AI Agent
                              </p>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Comming soon!
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuLink
                  href="https://openfga.dev/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${navigationMenuTriggerStyle()} gap-2`}
                >
                  <BookOpenText />
                  OpenFGA documentation
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="https://github.com/openfga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${navigationMenuTriggerStyle()} gap-2 bg-foreground text-background`}
                >
                  <Github />
                  View the code on GitHub →
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-start justify-items-center min-h-screen p-4gap-16 font-[family-name:var(--font-geist-sans)] w-[500px] mx-auto pt-8">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
