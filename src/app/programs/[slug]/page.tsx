import ProgramsPageWrapper from "@admin/components/ProgramsPage/ProgramsPageWrapper";
import {Fragment} from "react";
import LFNavbar from "@admin/components/LFNavbar";
import LFSidebar from "@admin/components/LFSidebar";

export async function generateMetadata() {
    return {
        title: `Program - Little FERN Admin`,
        description: `Admin Dashboard for Little FERN Website to manage content for individual programs.`
    }
}

export default async function ProgramPage({params: {slug}}: {
    params: { slug: string }
}) {
    return (
        <Fragment>
            <LFNavbar/>
            <LFSidebar/>
            <ProgramsPageWrapper slug={slug}/>
        </Fragment>
    )
}

export const dynamicParams = false