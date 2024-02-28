'use client'
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import Dropzone from "@admin/components/Dropzone";
import {useAboutPageStore} from "@admin/store/useAboutPageStore";

const AlternatingFeatures = () => {
    const {
        aboutPageData: {alternatingFeatures},
        setAlternatingFeaturesTitle,
        setAlternatingFeaturesUnderlinedText,
        setAFBlockHeadline,
        setAFBlockTagline,
        setAFBlockText
    } = useAboutPageStore()
    return <Fragment>
        <LFFormSection sectionTitle={'Alternating Features'}>
            <LFFormElement labelValue='Section Title' labelName='heroSectionTitle'>
                <TextInput id="heroSectionTitle" placeholder="Description for the Hero Block"
                           value={alternatingFeatures?.sectionTitle} required
                           onChange={(event) => setAlternatingFeaturesTitle(event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue='Underlined text' labelName='heroUnderlinedText'>
                <TextInput id="heroUnderlinedText" placeholder="underlined text for the Hero Block"
                           value={alternatingFeatures?.underlinedText} required
                           onChange={(event) => setAlternatingFeaturesUnderlinedText(event.target.value)}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'Alternating Features - Blocks'}>
            {alternatingFeatures?.blocks.map((feature) => {
                return (<Fragment key={feature._id.toString()}>
                    <LFFormElement labelValue='Tagline' labelName='feature-block-tagline'>
                        <TextInput id="feature-block-tagline" placeholder="Tagline for the Feature Block"
                                   value={feature.tagline} required
                                   onChange={(event) => setAFBlockTagline(feature._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue='Headline' labelName='feature-block-headline'>
                        <TextInput id="feature-block-headline" placeholder="Headline for the Feature Block"
                                   value={feature.headline} required
                                   onChange={(event) => setAFBlockHeadline(feature._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue='Text' labelName='feature-block-text'>
                        <TextInput id="feature-block-text" placeholder="underlined text for the Hero Block"
                                   value={feature.text} required
                                   onChange={(event) => setAFBlockText(feature._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <Dropzone imagePath={feature.image.src} withPopover/>
                </Fragment>)
            })}
        </LFFormSection>
    </Fragment>
}
export default AlternatingFeatures;