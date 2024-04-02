import dynamic from "next/dynamic";
import Loader from "@admin/components/Loader";

export async function generateMetadata() {
    return {
        title: `Program - Little FERN Admin`,
        description: `Admin Dashboard for Little FERN Website to manage content for individual programs.`
    }
}

const DynamicProgramPageWrapper = dynamic(() => import("@admin/components/ProgramsPage/ProgramsPageWrapper"), {
    loading: () => <Loader loading/>,
    ssr: false
})
export default async function ProgramPage({params: {slug}}: {
    params: { slug: string }
}) {
    return (
        <DynamicProgramPageWrapper slug={slug}/>
    )
}

export const dynamicParams = false