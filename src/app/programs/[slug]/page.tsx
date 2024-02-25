import ProgramsPage from "@admin/components/ProgramsPage";
import {HomePageData} from "@admin/types";
import {WithoutId} from "mongodb";
import {getHomePageData, getSchoolProgram} from "@admin/lib/homePage";

export async function generateMetadata() {
    return {
        title: `Program - Little FERN Admin`,
        description: `Admin Dashboard for Little FERN Website to manage content for individual programs.`
    }
}

export default async function ProgramPage({params: {slug}}: {
    params: { slug: string }
}) {
    const homePageData: WithoutId<HomePageData> = await getHomePageData()
    const schoolProgram = getSchoolProgram(slug, homePageData)
    if (!schoolProgram) return null

    return (<ProgramsPage schoolProgram={schoolProgram}/>)
}

export const dynamicParams = false