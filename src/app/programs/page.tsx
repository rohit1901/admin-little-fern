import type {Metadata} from "next";
import {getSchoolPrograms} from "@admin/lib/homePage";
import {ProgramTabs} from "@admin/components/ProgramTabs";

export const metadata: Metadata = {
    title: "Admin - Little Fern", description: "An admin dashboard for Little Fern Website to manage content",
};
export default async function ProgramsLayout() {
    const data = await getSchoolPrograms()
    const programs = JSON.parse(JSON.stringify(data));
    return (<div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <ProgramTabs programs={programs}/>
    </div>);
}
