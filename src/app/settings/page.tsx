import LFFormSection from "@admin/components/LFFormSection";
import {DeleteCard} from "@admin/components/SettingsPage/DeleteCard";
// Database Cleanup
// This option could allow the user to delete old data from the database.
export default async function Settings() {
    return (
        <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <LFFormSection sectionTitle="Settings">
                <DeleteCard/>
            </LFFormSection>
        </div>
    );
}