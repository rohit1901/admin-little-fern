import LFFormSection from "@admin/components/LFFormSection";
import {deleteAllButLatestData, getAllButLatestPageData} from "@admin/lib/settings";
// Database Cleanup
// This option could allow the user to delete old or unnecessary data from the database.
export default async function Settings() {
    const collections = await deleteAllButLatestData();
    console.log(collections);
    return (
        <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <LFFormSection sectionTitle="Settings">
                <main className='mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'></main>
            </LFFormSection>
        </div>
    );
}