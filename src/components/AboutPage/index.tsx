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
import {PageHeader} from "@admin/components/PageHeader";
import {API_ABOUT_GET} from "@admin/lib/constants";
import {isAboutPageData} from "@admin/lib";
import {useStaff} from "@admin/lib/hooks/useStaff";
import {ContentLoader} from "@admin/components/Loaders";

const AboutPageComponent = () => {
    const {aboutPageData, setAboutPageData} = useAboutPageStore()
    const {loading, setLoading} = useStaff()
    useEffect(() => {
        if (!aboutPageData?._id) {
            setLoading(true)
            fetch(API_ABOUT_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json()).then((response) => {
                setAboutPageData(response.body)
            }).finally(() => setLoading(false))
        }
    }, [])
    return (
        <ContentLoader loading={loading}>
            <div className='p-8 mx-auto 2xl:ml-64 ml-20 h-auto bg-white-50 dark:bg-gray-800'>
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
        </ContentLoader>
    );
}
export default AboutPageComponent;