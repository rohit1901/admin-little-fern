'use client'
import {AboutPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import LFFormSection from "@admin/components/LFFormSection";
import {useEffect} from "react";
import StaffDetails from "@admin/components/AboutPage/StaffDetails";
import AboutValueData from "@admin/components/AboutPage/AboutValueData";
import AboutTitle from "@admin/components/AboutPage/AboutTitle";
import AlternatingFeatures from "@admin/components/AboutPage/AlternatingFeatures";
import Stats from "@admin/components/AboutPage/Stats";
import {useAboutPageStore} from "@admin/store/useAboutPageStore";
import {ImageBlock} from "@admin/components/ImageBlock";
import {isAboutPageData} from "@admin/lib";

type AboutPageComponentProps = {
    pageData: AboutPageData
}
const AboutPageComponent = ({pageData}: AboutPageComponentProps) => {
    const {aboutPageData, setAboutPageData} = useAboutPageStore()
    useEffect(() => {
        setAboutPageData(pageData)
    }, [])
    const stringToArray = (string: string) => {
        return string.split(',').map((item) => item.trim())
    }
    return (
        <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <LFForm data={aboutPageData} updateState={(data) => {
                if (!isAboutPageData(data)) return
                setAboutPageData(data)
            }}>
                <AboutTitle/>
                <LFFormSection sectionTitle={'Hero Block Images'} isGallery>
                    {aboutPageData?.aboutHero?.map((hero) => <div className="m-4 text-center" key={hero._id.toString()}>
                        <ImageBlock imagePath={hero?.src}/></div>)}
                </LFFormSection>
                <AlternatingFeatures/>
                <Stats/>
                <StaffDetails/>
                <AboutValueData/>
            </LFForm>
        </div>
    );
}
export default AboutPageComponent;