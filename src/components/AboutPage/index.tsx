'use client'
import LFForm from "@admin/components/LFForm";
import LFFormSection from "@admin/components/LFFormSection";
import {useEffect} from "react";
import StaffDetails from "@admin/components/Staff/StaffDetails";
import AboutValueData from "@admin/components/AboutPage/AboutValueData";
import AboutTitle from "@admin/components/AboutPage/AboutTitle";
import AlternatingFeatures from "@admin/components/AboutPage/AlternatingFeatures";
import Stats from "@admin/components/AboutPage/Stats";
import {useAboutPageStore} from "@admin/store/";
import {ImageBlock} from "@admin/components/ImageBlock";
import {useStaffStore} from "@admin/store/useStaffStore";
import {PageHeader} from "@admin/components/PageHeader";
import {API_ABOUT_GET, API_STAFF_GET} from "@admin/lib/constants";
import {isAboutPageData} from "@admin/lib";

const AboutPageComponent = () => {
    const {aboutPageData, setAboutPageData} = useAboutPageStore()
    const {
        staffPageDataId,
        setStaffPageDataId,
        setStaffDetails,
        setStaffAssurancesBlock,
        setHomeTextBlock,
        setAboutTextBlock
    } = useStaffStore()
    useEffect(() => {
        if (!aboutPageData?._id) {
            fetch(API_ABOUT_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json()).then((response) => {
                setAboutPageData(response.body)
            })
        }
        if (!staffPageDataId) {
            fetch(API_STAFF_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setStaffDetails(data.body.staffDetails)
                    setStaffAssurancesBlock(data.body.assurancesBlock)
                    setHomeTextBlock(data.body.homeTextBlock)
                    setAboutTextBlock(data.body.aboutTextBlock)
                    setStaffPageDataId(data.body._id)
                }).catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [])
    if (!aboutPageData?._id) {
        return null
    }
    return (
        <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <LFForm data={aboutPageData} afterSubmit={(data) => {
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