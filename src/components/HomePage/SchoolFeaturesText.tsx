'use client'
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useHomePageStore} from "@admin/store";

const SchoolFeaturesText = () => {
    const {
        homePageData,
        setSchoolFeaturesHeading,
        setSchoolFeaturesSubHeading,
        setSchoolFeaturesFeatures
    } = useHomePageStore(state => state)
    return <Fragment>
        <LFFormSection sectionTitle='School Features'>
            {homePageData.schoolFeatures?.heading &&
                <LFFormElement labelValue="School features heading" labelName="sfh">
                    <TextInput id="sfh" type="text" placeholder="School features heading"
                               value={homePageData.schoolFeatures?.heading} required
                               onChange={(event) => setSchoolFeaturesHeading(event.currentTarget.value)}/>
                </LFFormElement>}
            {homePageData.schoolFeatures?.subHeading &&
                <LFFormElement labelValue="School features sub-heading" labelName="sfsh">
                    <TextInput id="sfsh" type="text" placeholder="School features  sub-heading"
                               value={homePageData.schoolFeatures?.subHeading} required
                               onChange={(event) => setSchoolFeaturesSubHeading(event.currentTarget.value)}/>
                </LFFormElement>}
            {homePageData.schoolFeatures?.features && <LFFormElement labelValue="School features" labelName="sff">
                <TextInput id="sff" type="text" placeholder="School features"
                           value={homePageData.schoolFeatures?.features?.toString()} required
                           onChange={(event) => setSchoolFeaturesFeatures(event.currentTarget.value)}/>
            </LFFormElement>}
        </LFFormSection>
    </Fragment>
}
export default SchoolFeaturesText;