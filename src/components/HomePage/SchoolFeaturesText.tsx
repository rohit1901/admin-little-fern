'use client'
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useHomePageStore} from "@admin/store";

const SchoolFeaturesText = () => {
    const {
        homePageData,
        setSchoolFeaturesHeading,
        setSchoolFeaturesSubHeading,
        setSchoolFeaturesFeatures
    } = useHomePageStore(state => state)
    return <LFFormSection sectionTitle='School Features'>
        <div
            className="md:w-1/2 md:pr-12 md:py-8 md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-200">
            {homePageData.schoolFeatures?.heading &&
                <LFFormElement labelValue="School features heading" labelName="sfh">
                    <TextInput id="sfh" type="text" placeholder="School features heading"
                               value={homePageData.schoolFeatures?.heading} required
                               onChange={(event) => setSchoolFeaturesHeading(event.currentTarget.value)}/>
                </LFFormElement>}
            {homePageData.schoolFeatures?.subHeading &&
                <LFFormElement labelValue="School features sub-heading" labelName="sfsh">
                    <Textarea id="sfsh" className='h-text-area' placeholder="School features  sub-heading"
                              value={homePageData.schoolFeatures?.subHeading} required
                              onChange={(event) => setSchoolFeaturesSubHeading(event.currentTarget.value)}/>
                </LFFormElement>}
            {homePageData.schoolFeatures?.features && <LFFormElement labelValue="School features" labelName="sff">
                <Textarea id="sff" className='h-text-area' placeholder="School features"
                          value={homePageData.schoolFeatures?.features?.toString()} required
                          onChange={(event) => setSchoolFeaturesFeatures(event.currentTarget.value)}/>
            </LFFormElement>}
        </div>
    </LFFormSection>
}
export default SchoolFeaturesText;