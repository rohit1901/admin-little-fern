'use client'
import {Checkbox, Label, Tooltip} from "flowbite-react";
import LFForm from "@admin/components/LFForm";
import HomeHero from "@admin/components/HomePage/HomeHero";
import SchoolFeaturesText from "@admin/components/HomePage/SchoolFeaturesText";
import SchoolFeaturesItems from "@admin/components/HomePage/SchoolFeaturesItems";
import Staff from "@admin/components/Staff/Staff";
import SchoolPrograms from "@admin/components/HomePage/SchoolPrograms";
import {useHomePageStore} from "@admin/store";
import {useEffect} from "react";
import FAQsBlock from "@admin/components/HomePage/FAQsBlock";
import {PageHeader} from "@admin/components/PageHeader";
import {API_HOME_GET} from "@admin/lib/constants";
import {isHomePageData} from "@admin/lib";

const HomePageComponent = () => {
    const {
        homePageData,
        setHomePageData
    } = useHomePageStore()
    useEffect(() => {
        if (!homePageData || !homePageData._id) {
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
            });
        }
    }, [])

    return (homePageData._id && <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
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

                <div className="flex items-center gap-2 pt-2 pb-2">
                    <Checkbox id="ratings" defaultChecked disabled/>
                    <Tooltip content="This feature is not yet available">
                        <Label htmlFor="ratings" className="flex" disabled>
                            Show ratings from Google Maps on the website
                        </Label>
                    </Tooltip>
                </div>

            </LFForm>
        </div>
    )
}
export default HomePageComponent