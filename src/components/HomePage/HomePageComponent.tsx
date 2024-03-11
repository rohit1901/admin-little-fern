'use client'
import {Checkbox, Label, Tooltip} from "flowbite-react";
import {HomePageData, SchoolProgramsBlock, StaffPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import HomeHero from "@admin/components/HomePage/HomeHero";
import SchoolFeaturesText from "@admin/components/HomePage/SchoolFeaturesText";
import SchoolFeaturesItems from "@admin/components/HomePage/SchoolFeaturesItems";
import Staff from "@admin/components/HomePage/Staff";
import SchoolPrograms from "@admin/components/HomePage/SchoolPrograms";
import {useHomePageStore, useSchoolProgramsPageStore} from "@admin/store";
import {useEffect} from "react";
import {WithId} from "mongodb";
import FAQsBlock from "@admin/components/HomePage/FAQsBlock";
import {isHomePageData} from "@admin/lib";
import {useStaffStore} from "@admin/store/useStaffStore";

type HomePageDataProps = {
    pageData: WithId<HomePageData>
    schoolProgramsBlockPageData: WithId<SchoolProgramsBlock>
    staffPageData: WithId<StaffPageData>
}
const HomePageComponent = ({pageData, schoolProgramsBlockPageData, staffPageData}: HomePageDataProps) => {
    const {
        homePageData,
        setHomePageData
    } = useHomePageStore()
    const {setPrograms, setHeading} = useSchoolProgramsPageStore()
    const {
        setStaffDetails,
        setStaffAssurancesBlock,
        setHomeTextBlock,
        setAboutTextBlock
    } = useStaffStore()
    useEffect(() => {
        setHomePageData(pageData)
        setPrograms(schoolProgramsBlockPageData?.schoolPrograms ?? [])
        setHeading(schoolProgramsBlockPageData?.heading ?? '')
        setStaffDetails(staffPageData?.staffDetails ?? [])
        setStaffAssurancesBlock(staffPageData?.assurancesBlock ?? {})
        setHomeTextBlock(staffPageData?.homeTextBlock ?? {})
        setAboutTextBlock(staffPageData?.aboutTextBlock ?? {})
    }, [])

    return (homePageData && <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
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