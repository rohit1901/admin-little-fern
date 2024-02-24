import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import "./globals.css";
import {Flowbite, ThemeModeScript} from "flowbite-react";
import LFNavbar from "@admin/components/LFNavbar";
import LFSidebar from "@admin/components/LFSidebar";
import {ReactNode, Suspense} from "react";
import {getSchoolPrograms} from "@admin/lib/homePage";
import {customTheme} from "@admin/theme/theme";

const notoFont = Noto_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Admin - Little Fern",
    description: "An admin dashboard for Little Fern Website to manage content",
};
export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: ReactNode;
}>) {
    const programs = await getSchoolPrograms()
    return (
        <html lang="en">
        <head>
            <ThemeModeScript/>
        </head>
        <body className={notoFont.className}>
        <Suspense fallback={<div>Loading...</div>}>
            <Flowbite theme={{theme: customTheme}}>
                <section className="antialiased bg-white-50 dark:bg-gray-800 mx-auto md:h-screen lg:py-0">
                    <LFNavbar/>
                    <LFSidebar programs={programs?.map(p => ({
                        name: p.name,
                        slug: p.slug
                    }))}/>
                    {children}
                </section>
            </Flowbite>
        </Suspense>
        </body>
        </html>
    );
}
