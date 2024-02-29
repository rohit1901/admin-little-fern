import {Button} from "flowbite-react";
import {Fragment} from "react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Fragment>
                <Button href="/"
                        className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'>Welcome
                    to your Dashboard, bitch!</Button>
            </Fragment>
        </main>
    );
}
