import {getHomePageData} from "@admin/lib/homePage";
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
    const homePageData = await getHomePageData()
    return <ProgramsPageWrapper homePageData={JSON.parse(JSON.stringify(homePageData))} slug={slug}/>
}

export const dynamicParams = false