'use client'
import {Banner, Button, Card} from "flowbite-react";
import Image from "next/image";
import {getImageUrl} from "@admin/lib";
import {signIn, useSession} from "next-auth/react";
import {HiMiniInformationCircle} from "react-icons/hi2";
import {redirect} from "next/navigation";
import {ScreenLoader} from "@admin/components/Loaders";
import {PiSignInBold} from "react-icons/pi";

export default function LoginPage() {
    const {status} = useSession();
    if (status === "loading") {
        return <ScreenLoader/>;
    }
    if (status === "authenticated") {
        redirect("/");
    }
    return (<section className="bg-white dark:bg-gray-800">
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
            <Button onClick={() => signIn("auth0")} outline>
                <div className='flex flex-row gap-2 items-center'>
                    <PiSignInBold className="mr-2 h-5 w-5"/>
                    <p>Sign in</p>
                </div>
            </Button>
        </Card>
    </section>)
}
