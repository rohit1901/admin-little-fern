import {Fragment} from "react";
import dynamic from "next/dynamic";
import {ScreenLoader} from "@admin/components/Loaders";

export async function generateMetadata() {
    return {
        title: `Pages - Little FERN Admin`, description: `Admin Dashboard for Little FERN Website to manage content for individual pages.`
    }
}

const DynamicContactPage = dynamic(() => import("@admin/components/ContactPage"), {
    loading: () => <ScreenLoader/>,
    ssr: false
})
const DynamicAboutPage = dynamic(() => import("@admin/components/AboutPage"), {
    loading: () => <ScreenLoader/>,
    ssr: false
})
const DynamicGalleryPage = dynamic(() => import("@admin/components/GalleryPage"), {
    loading: () => <ScreenLoader/>,
    ssr: false
})
const DynamicHomePage = dynamic(() => import("@admin/components/HomePage/HomePageComponent"), {
    loading: () => <ScreenLoader/>,
    ssr: false
})
const DynamicParentsPage = dynamic(() => import("@admin/components/ParentsPage"), {
    loading: () => <ScreenLoader/>,
    ssr: false
})
const getPageComponent = (slug: string) => {
    switch (slug) {
        case 'Home':
            return <DynamicHomePage/>
        case 'About':
            return <DynamicAboutPage/>
        case 'Gallery':
            return <DynamicGalleryPage/>
        case 'Parents':
            return <DynamicParentsPage/>
        case 'Contact':
            return <DynamicContactPage/>
        default:
            return null;
    }
}

export default function WebsitePage({params: {slug}}: {
    params: { slug: string }
}) {
    const elem = getPageComponent(slug);
    return (
        <Fragment>
            {elem}
        </Fragment>)
}

export const dynamicParams = true