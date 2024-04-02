import type {Metadata} from "next";
import {Outfit} from "next/font/google";
import "./globals.css";
import {Flowbite, ThemeModeScript} from "flowbite-react";
import {ReactNode} from "react";
import Providers from "@admin/app/providers";
import {customTheme} from "@admin/theme";
import LFNavbar from "@admin/components/LFNavbar";
import LFSidebar from "@admin/components/LFSidebar";

const customFont = Outfit({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Admin - Little Fern",
    description: "An admin dashboard for Little Fern Website to manage content",
};
export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <ThemeModeScript/><title>{metadata.title?.toString()}</title>
        </head>
        <body className={`bg-white dark:bg-gray-800 ${customFont.className}`}>
        <Providers>
            <Flowbite theme={{theme: customTheme}}>
                <section>
                    <LFNavbar/>
                    <LFSidebar/>
                    {children}
                </section>
            </Flowbite>
        </Providers>
        </body>
        </html>
    );
}
