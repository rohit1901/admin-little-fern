import HomePageComponent from "@admin/components/HomePage/HomePageComponent";
import AboutPageComponent from "@admin/components/AboutPage";
import GalleryPageComponent from "@admin/components/GalleryPage";
import ParentsPageComponent from "@admin/components/ParentsPage";
import ContactPageComponent from "@admin/components/ContactPage";
import {Spinner} from "flowbite-react";
import {Suspense} from "react";

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
    return <Suspense
        fallback={<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <Spinner aria-label="Page loading..."/>
        </div>}>
        {elem}
    </Suspense>
}

export const dynamicParams = false