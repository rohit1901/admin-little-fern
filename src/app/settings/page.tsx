'use client'
import {DeleteCard} from "@admin/components/SettingsPage/DeleteCard";
import {PageHeader} from "@admin/components/PageHeader";
import {useSession} from "next-auth/react";
import {ScreenLoader} from "@admin/components/Loaders";
import {GoogleReviewsCard} from "@admin/components/SettingsPage/GoogleReviewsCard";
// TODO: Add feature to hide ratings and testimonials block
// TODO: Add feature to toggle image previews
// TODO: Add feature to hide ratings and testimonials block
// TODO: Fetch new google reviews only when the user selects the option to show ratings and testimonials
export default function Settings() {
    const {status} = useSession();
    if (status === "unauthenticated") return null;
    if (status === "loading") return <ScreenLoader/>;
    return (
        <main className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <PageHeader title={'Settings'}/>
            <div className='flex flex-row gap-4 mt-4'>
                <DeleteCard/>
                <GoogleReviewsCard/>
            </div>
        </main>
    );
}