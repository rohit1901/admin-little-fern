"use client";
import {signIn, useSession} from "next-auth/react";
import {Banner, Button, Card, Flowbite} from "flowbite-react";
import {customTheme} from "@admin/theme";
import LFNavbar from "@admin/components/LFNavbar";
import LFSidebar from "@admin/components/LFSidebar";
import {PropsWithChildren} from "react";
import Image from "next/image";
import {getImageUrl} from "@admin/lib";
import Loader from "@admin/components/Loader";
import {HiMiniInformationCircle} from "react-icons/hi2";
import {FaSignInAlt} from "react-icons/fa";

export default function LoginMask({children}: PropsWithChildren) {
    const {status} = useSession();
    if (status === "loading") {
        return <Loader/>
    }
    if (status === "unauthenticated") return (<section className="bg-white dark:bg-gray-800">
        <Card className="max-w-sm mx-auto py-6 my-12">
            <Image alt="Little Fern Logo"
                   height="96"
                   src={getImageUrl('/images/bright-logo.png')}
                   width="96"
                   className="mb-3 mx-auto"/>
            <h5 className="text-2xl font-bold tracking-tight text-cyan-800 dark:text-cyan-50 text-center">
                Sign in to your account
            </h5>
            <Banner
                className="flex justify-between items-center rounded border-b border-gray-200 bg-gray-50 dark:border-cyan-50 dark:bg-cyan-50 p-2">
                <HiMiniInformationCircle className="mr-2 h-8 w-8 text-cyan-800"/>
                <p className="font-mono text-xs text-cyan-800">
                    You will be redirected to a secure sign in page where you can sign in with your credentials.
                </p>
            </Banner>
            <Button onClick={() => signIn()}>
                <div className="flex justify-center items-center">
                    <FaSignInAlt className="mr-2 h-5 w-5"/>
                    <span className="text-cyan-50">Sign in</span>
                </div>
            </Button>
        </Card>
    </section>);
    if (status === "authenticated") {
        return (<Flowbite theme={{theme: customTheme}}>
            <section>
                <LFNavbar/>
                <LFSidebar/>
                {children}
            </section>
        </Flowbite>);
    }
}
