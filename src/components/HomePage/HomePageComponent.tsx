'use client'
import {Checkbox, Label, Tooltip} from "flowbite-react";
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
import FAQsBlock from "@admin/components/HomePage/FAQsBlock";
import {isHomePageData} from "@admin/lib";

type HomePageDataProps = {
    pageData: WithId<HomePageData>
}
const HomePageComponent = ({pageData}: HomePageDataProps) => {
    const {
        homePageData,
        setHomePageData
    } = useHomePageStore()
    useEffect(() => {
        setHomePageData(pageData)
    }, [])

    return (homePageData && <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <LFForm data={homePageData} updateState={(data) => {
                if (isHomePageData(data)) setHomePageData(data)
            }}>
                {/* Hero Block */}
                <HomeHero image={homePageData.homeHero?.hero.image} tagline={homePageData.homeHero?.hero.tagline}
                          headline={homePageData.homeHero?.hero.headline} text={homePageData.homeHero?.hero.text}
                          youTubeLink={homePageData.homeHero?.hero.youTubeLink}/>
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