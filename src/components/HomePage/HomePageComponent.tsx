'use client'
import {Checkbox, Label} from "flowbite-react";
import {HomePageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import HomeHero from "@admin/components/HomePage/HomeHero";
import SchoolFeaturesText from "@admin/components/HomePage/SchoolFeaturesText";
import SchoolFeaturesItems from "@admin/components/HomePage/SchoolFeaturesItems";
import Staff from "@admin/components/HomePage/Staff";
import SchoolPrograms from "@admin/components/HomePage/SchoolPrograms";
import {useHomePageStore} from "@admin/store";
import {useEffect} from "react";
import {WithId} from "mongodb";

type HomePageDataProps = {
    data: WithId<HomePageData>
}
const HomePageComponent = ({data}: HomePageDataProps) => {
    const {
        setHomePageData
    } = useHomePageStore((state) => state)
    useEffect(() => {
        setHomePageData(data)
    }, [])

    return (<div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800 w-5/6'>
            <LFForm>
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
                {/*Testimonials*/}
                {/*<Testimonials testimonialsBlock={homePage.testimonialsBlock}/>*/}
                {/*FAQ Block*/}
                {/*<FAQsBlock faqBlock={homePage.faqBlock}/>*/}

                <div className="flex items-center gap-2 pt-2 pb-2">
                    <Checkbox id="ratings" defaultChecked/>
                    <Label htmlFor="ratings" className="flex">
                        Show ratings from Google Maps on the website
                    </Label>
                </div>
            </LFForm>
        </div>
    )
}
export default HomePageComponent