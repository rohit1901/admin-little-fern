"use client";
import {signIn, useSession} from "next-auth/react";
import {Button, Card, Flowbite} from "flowbite-react";
import {customTheme} from "@admin/theme";
import LFNavbar from "@admin/components/LFNavbar";
import LFSidebar from "@admin/components/LFSidebar";
import {PropsWithChildren} from "react";
import Image from "next/image";
import {getImageUrl} from "@admin/lib";

export default function LoginButton({children}: PropsWithChildren) {
    const {data: session} = useSession();
    if (session && session.user) {
        return (
            <Flowbite theme={{theme: customTheme}}>
                <section className="antialiased md:h-screen lg:py-0">
                    <LFNavbar/>
                    <LFSidebar/>
                    {children}
                </section>
            </Flowbite>
        );
    }
    return (
        <section className="bg-white dark:bg-gray-800">
            <Card className="max-w-sm mx-auto py-6 my-12">
                <Image alt="Little Fern Logo"
                       height="96"
                       src={getImageUrl('/images/bright-logo.png')}
                       width="96"
                       className="mb-3 mx-auto"/>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    Sign in to your account
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                    You will be redirected to a secure sign in page where you can sign in with your AWS Cognito account.
                </p>
                <Button onClick={() => signIn()}>
                    Sign in
                </Button>
            </Card>
        </section>
    );
}
