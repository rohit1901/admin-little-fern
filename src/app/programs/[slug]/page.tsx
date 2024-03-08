import {getHomePageData, getSchoolProgramsBlock} from "@admin/lib/homePage";
import ProgramsPageWrapper from "@admin/components/ProgramsPage/ProgramsPageWrapper";

export async function generateMetadata() {
    return {
        title: `Program - Little FERN Admin`,
        description: `Admin Dashboard for Little FERN Website to manage content for individual programs.`
    }
}

export default async function ProgramPage({params: {slug}}: {
    params: { slug: string }
}) {
    const schoolProgramsBlock = await getSchoolProgramsBlock()
    return <ProgramsPageWrapper schoolProgramsBlock={JSON.parse(JSON.stringify(schoolProgramsBlock))} slug={slug}/>
}

export const dynamicParams = false