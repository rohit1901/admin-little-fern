import {DeleteCard} from "@admin/components/SettingsPage/DeleteCard";
import {PageHeader} from "@admin/components/PageHeader";
// Database Cleanup
// This option could allow the user to delete old data from the database.
export default async function Settings() {
    return (
        <main className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <PageHeader title={'Settings'}/>
            <div className='flex flex-row gap-4 mt-4'>
                <DeleteCard/>
            </div>
        </main>
    );
}