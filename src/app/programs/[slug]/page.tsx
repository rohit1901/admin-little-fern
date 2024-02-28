import {getSchoolPrograms} from "@admin/lib/homePage";
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
    const schoolPrograms = await getSchoolPrograms()
    return <ProgramsPageWrapper schoolPrograms={JSON.parse(JSON.stringify(schoolPrograms))} slug={slug}/>
}

export const dynamicParams = false