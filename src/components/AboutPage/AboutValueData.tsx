'use client'
import LFFormSection from "@admin/components/LFFormSection";
import {Textarea, TextInput} from "flowbite-react";
import LFFormElement from "@admin/components/LFFormElement";
import Dropzone from "@admin/components/Dropzone";
import {Fragment} from "react";
import {useAboutPageStore} from "@admin/store/useAboutPageStore";

const AboutValueData = () => {
    const {
        aboutPageData: {valueData},
        setValueDataHeading,
        setValueDataSubHeading,
        setValueDataValue,
        setValueDataDescription
    } = useAboutPageStore()
    return (<LFFormSection sectionTitle={'Value Data'}>
        <LFFormElement labelValue='Heading' labelName='value-heading'>
            <TextInput id="value-heading" placeholder="Title for the Hero Block"
                       value={valueData?.heading} required
                       onChange={(event) => setValueDataHeading(event.target.value)}/>
        </LFFormElement>
        <LFFormElement labelValue='Sub-heading' labelName='value-sub-heading'>
            <Textarea id="value-sub-heading" placeholder="sub-heading for the Hero Block" className="h-text-area"
                      value={valueData?.subHeading} required
                      onChange={(event) => setValueDataSubHeading(event.target.value)}/>
        </LFFormElement>
        {valueData?.values.map((value) => {
            return (<Fragment key={value._id.toString()}>
                <LFFormElement labelValue='Value' labelName='value-value'>
                    <TextInput id="value-value" placeholder="Value for the Value"
                               value={value.value} required
                               onChange={(event) => setValueDataValue(value._id.toString(), event.target.value)}/>
                </LFFormElement>
                <LFFormElement labelValue='Description' labelName='value-description'>
                    <Textarea id="value-description" placeholder="Description for the Value" className="h-text-area"
                              value={value.description} required
                              onChange={(event) => setValueDataDescription(value._id.toString(), event.target.value)}/>
                </LFFormElement>
            </Fragment>)
        })}
        <Dropzone imagePath={valueData?.image.src} withPopover/>
    </LFFormSection>)

}
export default AboutValueData;