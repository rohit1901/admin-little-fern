'use client'
import {Button, Card} from "flowbite-react";
import Image from "next/image";
import {getImageUrl} from "@admin/lib";
import {signIn} from "next-auth/react";

export default function LoginPage () {
    return <section className="bg-white dark:bg-gray-800">
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
}