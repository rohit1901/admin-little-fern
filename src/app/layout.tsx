import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import "./globals.css";
import {Spinner, ThemeModeScript} from "flowbite-react";
import {ReactNode, Suspense} from "react";
import {getSchoolPrograms} from "@admin/lib/homePage";
import Providers from "@admin/app/providers";
import LoginButton from "@admin/components/LoginButton";

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
            <ThemeModeScript/><title>{metadata.title?.toString()}</title>
        </head>
        <body className={`bg-white dark:bg-gray-800 ${notoFont.className}`}>
        <Providers>
            <Suspense
                fallback={<div
                    className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <Spinner aria-label="Default status example"/>
                </div>}>
                <LoginButton programs={programs}>{children}</LoginButton>
            </Suspense>
        </Providers>
        </body>
        </html>
    );
}
