'use client'
import {AboutPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import LFFormSection from "@admin/components/LFFormSection";
import {useState} from "react";
import Dropzone from "@admin/components/Dropzone";
import StaffDetails from "@admin/components/AboutPage/StaffDetails";
import AboutValueData from "@admin/components/AboutPage/AboutValueData";
import AboutTitle from "@admin/components/AboutPage/AboutTitle";
import AlternatingFeatures from "@admin/components/AboutPage/AlternatingFeatures";
import Stats from "@admin/components/AboutPage/Stats";

type AboutPageComponentProps = {
    aboutPageData: AboutPageData
}
const AboutPageComponent = ({aboutPageData}: AboutPageComponentProps) => {
    const [pageData, setPageData] = useState<AboutPageData>(aboutPageData)
    const onChange = (updatedData: AboutPageData) => {
        setPageData(updatedData)
    }

    const stringToArray = (string: string) => {
        return string.split(',').map((item) => item.trim())
    }
    return (
        <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <LFForm>
                <AboutTitle title={pageData.title} subTitle={pageData.subTitle} description={pageData.description}/>
                <LFFormSection sectionTitle={'Hero Block Images'}>
                    {pageData.aboutHero?.map((hero) => <Dropzone imagePath={hero?.src} withPopover
                                                                 key={`hero-${hero?.src}`}/>)}
                </LFFormSection>
                <AlternatingFeatures alternatingFeatures={pageData.alternatingFeatures}/>
                <Stats statsBlock={pageData.statsBlock}/>
                <StaffDetails staffBlock={pageData.staffBlock}/>
                <AboutValueData valueData={pageData.valueData}/>
            </LFForm>
        </div>
    );
}
export default AboutPageComponent;