import {Button} from "flowbite-react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button href="/dashboard"
                    className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'>Welcome,
                bitch!</Button>
        </main>
    );
}
