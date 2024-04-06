'use client'
import {DeleteCard} from "@admin/components/SettingsPage/DeleteCard";
import {PageHeader} from "@admin/components/PageHeader";
import {useSession} from "next-auth/react";
import {ScreenLoader} from "@admin/components/Loaders";
import {GoogleReviewsCard} from "@admin/components/SettingsPage/GoogleReviewsCard";
import {ImagePreviewCard} from "@admin/components/SettingsPage/ImagePreviewCard";
// TODO: Add feature to toggle image previews
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
                <ImagePreviewCard/>
            </div>
        </main>
    );
}