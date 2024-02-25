import {ValueData} from "@admin/types";
import LFFormSection from "@admin/components/LFFormSection";
import {Textarea, TextInput} from "flowbite-react";
import LFFormElement from "@admin/components/LFFormElement";
import Dropzone from "@admin/components/Dropzone";
import {Fragment} from "react";

type AboutValueDataProps = {
    valueData: ValueData
}
const AboutValueData = ({valueData}: AboutValueDataProps) => {
    return (<LFFormSection sectionTitle={'Value Data'}>
        <LFFormElement labelValue='Heading' labelName='value-heading'>
            <TextInput id="value-heading" placeholder="Title for the Hero Block"
                       value={valueData.heading} required onChange={(event) => {
                // update the title
            }}/>
        </LFFormElement>
        <LFFormElement labelValue='Sub-heading' labelName='value-sub-heading'>
            <Textarea id="value-sub-heading" placeholder="sub-heading for the Hero Block" className="h-text-area"
                      value={valueData.subHeading} required onChange={(event) => {
                // update the description
            }}/>
        </LFFormElement>
        {valueData.values.map((value) => {
            return (<Fragment key={`value-${value.value}`}>
                <LFFormElement labelValue='Value' labelName='value-value'>
                    <TextInput id="value-value" placeholder="Value for the Value"
                               value={value.value} required onChange={(event) => {
                        // update the description
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue='Description' labelName='value-description'>
                    <Textarea id="value-description" placeholder="Description for the Value" className="h-text-area"
                              value={value.description} required onChange={(event) => {
                        // update the description
                    }}/>
                </LFFormElement>
            </Fragment>)
        })}
        <Dropzone imagePath={valueData.image.src} withPopover/>
    </LFFormSection>)

}
export default AboutValueData;