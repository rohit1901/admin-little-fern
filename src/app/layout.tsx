import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import "./globals.css";
import {ThemeModeScript} from "flowbite-react";
import {ReactNode, Suspense} from "react";
import Providers from "@admin/app/providers";
import LoginMask from "@admin/components/LoginMask";
import Loader from "@admin/components/Loader";

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
    return (
        <html lang="en">
        <head>
            <ThemeModeScript/><title>{metadata.title?.toString()}</title>
        </head>
        <body className={`bg-white dark:bg-gray-800 ${notoFont.className}`}>
        <Providers>
            <Suspense
                fallback={<Loader/>}>
                <LoginMask>{children}</LoginMask>
            </Suspense>
        </Providers>
        </body>
        </html>
    );
}
