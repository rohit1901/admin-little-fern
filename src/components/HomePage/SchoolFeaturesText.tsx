'use client'
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import {SchoolFeatures} from "@admin/types";
import LFFormSection from "@admin/components/LFFormSection";

type SchoolFeaturesTextProps = {
    schoolFeatures: SchoolFeatures
}
const SchoolFeaturesText = ({schoolFeatures}: SchoolFeaturesTextProps) => {
    const onChange = (schoolFeatures: SchoolFeatures, value?: string) => {
        //
    }
    return <Fragment>
        <LFFormSection sectionTitle='School Features'>
            <LFFormElement labelValue="School features heading" labelName="sfh">
                <TextInput id="sfh" type="text" placeholder="School features heading"
                           value={schoolFeatures.heading} required
                           onChange={(event) => onChange(schoolFeatures, event.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="School features sub-heading" labelName="sfsh">
                <TextInput id="sfsh" type="text" placeholder="School features  sub-heading"
                           value={schoolFeatures.subHeading} required
                           onChange={(event) => onChange(schoolFeatures, event.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="School features text" labelName="sff">
                <TextInput id="sff" type="text" placeholder="School features text"
                           value={schoolFeatures.features?.toString()} required
                           onChange={(event) => onChange(schoolFeatures, event.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="School features" labelName="sff">
                <TextInput id="sff" type="text" placeholder="School features"
                           value={schoolFeatures.features?.toString()} required
                           onChange={(event) => onChange(schoolFeatures, event.currentTarget.value)}/>
            </LFFormElement>
        </LFFormSection>
    </Fragment>
}
export default SchoolFeaturesText;