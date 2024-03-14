import {AboutPageData, ContactPageData, GalleryPageData, HomePageData, ParentsPageData, SchoolProgramsBlock, StaffPageData} from "@admin/types";
import {getHomePageData, getSchoolProgramsBlock, getStaff} from "@admin/lib/homePage";
import HomePageComponent from "@admin/components/HomePage/HomePageComponent";
import {getAboutPageData} from "@admin/lib/aboutPage";
import AboutPageComponent from "@admin/components/AboutPage";
import {getGalleryPageData} from "@admin/lib/galleryPage";
import GalleryPageComponent from "@admin/components/GalleryPage";
import {WithId} from "mongodb";
import ParentsPageComponent from "@admin/components/ParentsPage";
import ContactPageComponent from "@admin/components/ContactPage";
import {getParentsPage} from "@admin/lib/parentsPage";
import {getContactPageData} from "@admin/lib/contactPage";
import {Spinner} from "flowbite-react";
import {Suspense} from "react";

export async function generateMetadata() {
    return {
        title: `Pages - Little FERN Admin`, description: `Admin Dashboard for Little FERN Website to manage content for individual pages.`
    }
}

const getElems = async (slug: string) => {
    if (slug === 'Home') {
        const homePageData: WithId<HomePageData> = await getHomePageData()
        const schoolProgramsBlock: WithId<SchoolProgramsBlock> = await getSchoolProgramsBlock()
        const staffPageData: WithId<StaffPageData> = await getStaff()
        const plainHomePageData: WithId<HomePageData> = JSON.parse(JSON.stringify(homePageData));
        const plainSchoolProgramsBlock: WithId<SchoolProgramsBlock> = JSON.parse(JSON.stringify(schoolProgramsBlock));
        const plainStaffPageData: WithId<StaffPageData> = JSON.parse(JSON.stringify(staffPageData));
        return <HomePageComponent pageData={plainHomePageData} schoolProgramsBlockPageData={plainSchoolProgramsBlock}
                                  staffPageData={plainStaffPageData}/>
    }
    if (slug === 'About') {
        const aboutPageData: WithId<AboutPageData> = await getAboutPageData()
        const staffPageData: WithId<StaffPageData> = await getStaff()
        const plainStaffPageData: WithId<StaffPageData> = JSON.parse(JSON.stringify(staffPageData));
        const plainAboutPageData: WithId<AboutPageData> = JSON.parse(JSON.stringify(aboutPageData));
        return <AboutPageComponent pageData={plainAboutPageData} staffPageData={plainStaffPageData}/>
    }
    if (slug === 'Gallery') {
        const galleryPageData: WithId<GalleryPageData> = await getGalleryPageData()
        const plainGalleryPageData: WithId<GalleryPageData> = JSON.parse(JSON.stringify(galleryPageData));
        return <GalleryPageComponent pageData={plainGalleryPageData}/>
    }
    if (slug === 'Parents') {
        const parentsPageData: WithId<ParentsPageData> = await getParentsPage()
        const plainParentsPageData: WithId<ParentsPageData> = JSON.parse(JSON.stringify(parentsPageData));
        return <ParentsPageComponent pageData={plainParentsPageData}/>
    }
    if (slug === 'Contact') {
        const contactPageData: WithId<ContactPageData> = await getContactPageData()
        const plainContactPageData: WithId<ContactPageData> = JSON.parse(JSON.stringify(contactPageData));
        return <ContactPageComponent pageData={plainContactPageData}/>
    }
    return null
}
export default async function WebsitePage({params: {slug}}: {
    params: { slug: string }
}) {
    const elem = await getElems(slug)
    return <Suspense
        fallback={<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <Spinner aria-label="Default status example"/>
        </div>}>
        {elem}
    </Suspense>
}

export const dynamicParams = false