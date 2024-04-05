'use client'
import {DeleteCard} from "@admin/components/SettingsPage/DeleteCard";
import {PageHeader} from "@admin/components/PageHeader";
import {useSession} from "next-auth/react";
import {ScreenLoader} from "@admin/components/Loaders";
import {FetchReviewsCard} from "@admin/components/SettingsPage/FetchReviewsCard";
// Database Cleanup
// This option could allow the user to delete old data from the database.
export default function Settings() {
    const {status} = useSession();
    if (status === "unauthenticated") return null;
    if (status === "loading") return <ScreenLoader/>;
    return (
        <main className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <PageHeader title={'Settings'}/>
            <div className='flex flex-row gap-4 mt-4'>
                <DeleteCard/>
                <FetchReviewsCard/>
            </div>
        </main>
    );
}