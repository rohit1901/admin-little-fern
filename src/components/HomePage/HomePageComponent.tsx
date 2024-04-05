'use client'
import LFForm from "@admin/components/LFForm";
import HomeHero from "@admin/components/HomePage/HomeHero";
import SchoolFeaturesText from "@admin/components/HomePage/SchoolFeaturesText";
import SchoolFeaturesItems from "@admin/components/HomePage/SchoolFeaturesItems";
import Staff from "@admin/components/Staff/Staff";
import SchoolPrograms from "@admin/components/HomePage/SchoolPrograms";
import {useHomePageStore} from "@admin/store";
import {useEffect, useState} from "react";
import FAQsBlock from "@admin/components/HomePage/FAQsBlock";
import {PageHeader} from "@admin/components/PageHeader";
import {API_HOME_GET} from "@admin/lib/constants";
import {isHomePageData} from "@admin/lib";
import {ContentLoader} from "@admin/components/Loaders";

const HomePageComponent = () => {
    const [loading, setLoading] = useState(false)
    const {
        homePageData,
        setHomePageData, setRatings, setTestimonialsBlock
    } = useHomePageStore()
    useEffect(() => {
        if (!homePageData || !homePageData._id) {
            setLoading(true)
            fetch(API_HOME_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setHomePageData(data.body)
                }).catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [])
    return (
        <ContentLoader loading={loading}>
            <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
                <LFForm data={homePageData} afterSubmit={(data) => {
                    if (!isHomePageData(data)) return
                    setHomePageData(data)
                }}>
                    <PageHeader title={'Home Page'}/>
                    {/* Hero Block */}
                    <HomeHero/>
                    {/* School Features heading, subheading, text */}
                    <SchoolFeaturesText/>
                    {/* School Features items */}
                    <SchoolFeaturesItems/>
                    {/* Featured Staff block */}
                    <Staff/>
                    {/*School Programs heading, sub-heading*/}
                    <SchoolPrograms/>
                    {/*FAQ Block*/}
                    <FAQsBlock/>
                </LFForm>
            </div>
        </ContentLoader>
    )
}
export default HomePageComponent