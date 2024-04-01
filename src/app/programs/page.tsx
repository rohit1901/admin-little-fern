import type {Metadata} from "next";
import {ProgramTabs} from "@admin/components/ProgramTabs";
import {Fragment} from "react";
import LFNavbar from "@admin/components/LFNavbar";
import LFSidebar from "@admin/components/LFSidebar";

export const metadata: Metadata = {
    title: "Admin - Little Fern", description: "An admin dashboard for Little Fern Website to manage content",
};
export default async function ProgramsLayout() {
    return (<Fragment>
        <LFNavbar/>
        <LFSidebar/>
        <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <ProgramTabs/>
        </div>
    </Fragment>);
}
