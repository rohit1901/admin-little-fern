'use client'
import {Button, Checkbox, Label} from "flowbite-react";
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

    const stringToArray = (string: string) => {
        return string.split(',').map((item) => item.trim())
    }
    return (<div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
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
            </LFForm>
            <div className="flex items-center gap-2 pt-2 pb-2">
                <Checkbox id="ratings" defaultChecked/>
                <Label htmlFor="ratings" className="flex">
                    Show ratings from Google Maps on the website
                </Label>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                <Button className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'
                        type="submit">Reset</Button>
                <Button className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'
                        type="submit">Submit</Button>
            </div>
        </div>
    )
}
export default HomePageComponent