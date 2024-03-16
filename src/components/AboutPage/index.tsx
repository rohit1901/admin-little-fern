'use client'
import {AboutPageData, StaffPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import LFFormSection from "@admin/components/LFFormSection";
import {useEffect} from "react";
import StaffDetails from "@admin/components/AboutPage/StaffDetails";
import AboutValueData from "@admin/components/AboutPage/AboutValueData";
import AboutTitle from "@admin/components/AboutPage/AboutTitle";
import AlternatingFeatures from "@admin/components/AboutPage/AlternatingFeatures";
import Stats from "@admin/components/AboutPage/Stats";
import {useAboutPageStore} from "@admin/store/";
import {ImageBlock} from "@admin/components/ImageBlock";
import {isAboutPageData} from "@admin/lib";
import {WithId} from "mongodb";
import {useStaffStore} from "@admin/store/useStaffStore";
import {PageHeader} from "@admin/components/PageHeader";

type AboutPageComponentProps = {
    pageData: WithId<AboutPageData>,
    staffPageData: WithId<StaffPageData>
}
const AboutPageComponent = ({pageData, staffPageData}: AboutPageComponentProps) => {
    const {aboutPageData, setAboutPageData} = useAboutPageStore()
    const {
        setStaffDetails,
        setStaffAssurancesBlock,
        setHomeTextBlock,
        setAboutTextBlock
    } = useStaffStore()
    useEffect(() => {
        setAboutPageData(pageData)
        setStaffDetails(staffPageData?.staffDetails ?? [])
        setStaffAssurancesBlock(staffPageData?.assurancesBlock ?? {})
        setHomeTextBlock(staffPageData?.homeTextBlock ?? {})
        setAboutTextBlock(staffPageData?.aboutTextBlock ?? {})
    }, [])

    return (
        <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <LFForm data={aboutPageData} updateState={(data) => {
                if (!isAboutPageData(data)) return
                setAboutPageData(data)
            }}>
                <PageHeader title={'About Page'}/>
                <AboutTitle/>
                <LFFormSection sectionTitle={'Hero Block Images'} wrap>
                    {aboutPageData?.aboutHero?.map((hero) => <div className="m-4 text-center" key={hero?._id.toString()}>
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