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
    return <ProgramsPageWrapper slug={slug}/>
}

export const dynamicParams = false