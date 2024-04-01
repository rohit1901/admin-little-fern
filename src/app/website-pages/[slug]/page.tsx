import HomePageComponent from "@admin/components/HomePage/HomePageComponent";
import AboutPageComponent from "@admin/components/AboutPage";
import GalleryPageComponent from "@admin/components/GalleryPage";
import ParentsPageComponent from "@admin/components/ParentsPage";
import ContactPageComponent from "@admin/components/ContactPage";
import {Fragment, Suspense} from "react";
import LFNavbar from "@admin/components/LFNavbar";
import LFSidebar from "@admin/components/LFSidebar";
import Loader from "@admin/components/Loader";

export async function generateMetadata() {
    return {
        title: `Pages - Little FERN Admin`, description: `Admin Dashboard for Little FERN Website to manage content for individual pages.`
    }
}

const getPageComponent = (slug: string) => {
    switch (slug) {
        case 'Home':
            return <HomePageComponent/>
        case 'About':
            return <AboutPageComponent/>
        case 'Gallery':
            return <GalleryPageComponent/>
        case 'Parents':
            return <ParentsPageComponent/>
        case 'Contact':
            return <ContactPageComponent/>
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
            <LFNavbar/>
            <LFSidebar/>
            <Suspense
                fallback={<Loader/>}>
                {elem}
            </Suspense>
        </Fragment>)
}

export const dynamicParams = false