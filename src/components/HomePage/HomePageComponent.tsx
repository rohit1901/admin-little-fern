'use client'
import {Checkbox, Label} from "flowbite-react";
import {HomePageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import HomeHero from "@admin/components/HomePage/HomeHero";
import SchoolFeaturesText from "@admin/components/HomePage/SchoolFeaturesText";
import SchoolFeaturesItems from "@admin/components/HomePage/SchoolFeaturesItems";
import Staff from "@admin/components/HomePage/Staff";
import SchoolPrograms from "@admin/components/HomePage/SchoolPrograms";
import Testimonials from "@admin/components/HomePage/Testimonials";
import FAQsBlock from "@admin/components/HomePage/FAQsBlock";

type HomePageDataProps = {
    homePageData: HomePageData
}
const HomePageComponent = ({homePageData}: HomePageDataProps) => {

    return (<div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800 w-5/6'>
            <LFForm>
                {/* Hero Block */}
                <HomeHero homeHero={homePageData.homeHero}/>
                {/* School Features heading, subheading, text */}
                <SchoolFeaturesText schoolFeatures={homePageData.schoolFeatures}/>
                {/* School Features items */}
                <SchoolFeaturesItems schoolFeatures={homePageData.schoolFeatures}/>
                {/* Featured Staff block */}
                <Staff staff={homePageData.staff}/>
                {/*School Programs heading, sub-heading*/}
                <SchoolPrograms schoolProgramsBlock={homePageData.schoolProgramsBlock}/>
                {/*Testimonials*/}
                <Testimonials testimonialsBlock={homePageData.testimonialsBlock}/>
                {/*FAQ Block*/}
                <FAQsBlock faqBlock={homePageData.faqBlock}/>

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