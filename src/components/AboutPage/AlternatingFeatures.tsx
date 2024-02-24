import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {AlternatingFeaturesData} from "@admin/types";
import Dropzone from "@admin/components/Dropzone";

type AlternatingFeaturesProps = {
    alternatingFeatures: AlternatingFeaturesData
}
const AlternatingFeatures = ({alternatingFeatures}: AlternatingFeaturesProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'Alternating Features'}>
            <LFFormElement labelValue='Section Title' labelName='heroSectionTitle'>
                <TextInput id="heroSectionTitle" placeholder="Description for the Hero Block"
                           value={alternatingFeatures.sectionTitle} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
            <LFFormElement labelValue='Underlined text' labelName='heroUnderlinedText'>
                <TextInput id="heroUnderlinedText" placeholder="underlined text for the Hero Block"
                           value={alternatingFeatures.underlinedText} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'Alternating Features - Blocks'}>
            {alternatingFeatures.blocks.map((feature) => {
                return (
                    <Fragment key={`block-${feature.tagline}`}>
                        <LFFormElement labelValue='Tagline' labelName='feature-block-tagline'>
                            <TextInput id="feature-block-tagline" placeholder="Tagline for the Feature Block"
                                       value={feature.tagline} required onChange={(event) => {
                                // update the description
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue='Headline' labelName='feature-block-headline'>
                            <TextInput id="feature-block-headline" placeholder="Headline for the Feature Block"
                                       value={feature.headline} required onChange={(event) => {
                                // update the description
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue='Text' labelName='feature-block-text'>
                            <TextInput id="feature-block-text" placeholder="underlined text for the Hero Block"
                                       value={feature.text} required onChange={(event) => {
                                // update the description
                            }}/>
                        </LFFormElement>
                        <Dropzone imagePath={feature.image.src} withPopover/>
                    </Fragment>
                )
            })}
        </LFFormSection>
    </Fragment>
}
export default AlternatingFeatures;