import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";
import {SchoolFeatures} from "@admin/types";


type SchoolFeaturesTextProps = {
    schoolFeatures: SchoolFeatures
}
const SchoolFeaturesItems = ({schoolFeatures}: SchoolFeaturesTextProps) => {
    const onChange = (schoolFeatures: SchoolFeatures, value?: string) => {
        //
    }
    return <Fragment>
        <LFFormSection sectionTitle='School Features Block'>
            {schoolFeatures.featureBlocks?.map(block => {
                return (<Fragment key={block.headline}>
                        <LFFormElement labelValue="School Feature Headline" labelName='schoolFeatureHeadline'>
                            <TextInput id="sffbh" type="text"
                                       placeholder="School features block headline"
                                       value={block.headline} required onChange={(event) => {
                                // update the block headline
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="School feature tagline" labelName='sffbt'>
                            <TextInput id="sffbt" type="text"
                                       placeholder="School features features block tagline"
                                       value={block.tagline} required onChange={(event) => {
                                // update the block headline
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="School feature text" labelName='sffbtx'>
                            <TextInput id="sffbtx" type="text"
                                       placeholder="School features features block text"
                                       value={block.text} required onChange={(event) => {
                                // update the block headline
                            }}/>
                        </LFFormElement>
                        <Dropzone imagePath={block.portraitImage?.src} withPopover/>
                        <Dropzone imagePath={block.squareImage?.src} withPopover/>
                    </Fragment>
                )
            })}
        </LFFormSection>
    </Fragment>
}
export default SchoolFeaturesItems;