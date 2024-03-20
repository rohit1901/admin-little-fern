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
    if (!homePageData || !homePageData._id) return null
    return <LFFormSection sectionTitle='School Features' row>
        <LFFormElement labelValue="School features heading" labelName="sfh"
                       elemValue={homePageData.schoolFeatures?.heading} className="w-full mr-2">
            <TextInput id="sfh" type="text" placeholder="School features heading"
                       value={homePageData.schoolFeatures?.heading} required
                       onChange={(event) => setSchoolFeaturesHeading(event.currentTarget.value)}/>
        </LFFormElement>
        <LFFormElement labelValue="School features sub-heading" labelName="sfsh"
                       elemValue={homePageData.schoolFeatures?.subHeading} className="w-full mr-2">
            <Textarea id="sfsh" className='h-text-area' placeholder="School features  sub-heading"
                      value={homePageData.schoolFeatures?.subHeading} required
                      onChange={(event) => setSchoolFeaturesSubHeading(event.currentTarget.value)}/>
        </LFFormElement>
        <LFFormElement labelValue="School features" labelName="sff"
                       elemValue={homePageData.schoolFeatures?.features?.toString()} className="w-full">
            <Textarea id="sff" className='h-text-area' placeholder="School features"
                      value={homePageData.schoolFeatures?.features?.toString()} required
                      onChange={(event) => setSchoolFeaturesFeatures(event.currentTarget.value)}/>
        </LFFormElement>
    </LFFormSection>
}
export default SchoolFeaturesText;