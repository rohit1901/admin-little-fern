'use client'
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useAboutPageStore} from "@admin/store/";
import {ImageBlock} from "@admin/components/ImageBlock";

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
            <div className="lg:flex-grow md:w-1/2 pr-4">
                <LFFormElement labelValue='Section Title' labelName='heroSectionTitle'
                               elemValue={alternatingFeatures?.sectionTitle}>
                    <TextInput id="heroSectionTitle" placeholder="Description for the Hero Block"
                               value={alternatingFeatures?.sectionTitle} required
                               onChange={(event) => setAlternatingFeaturesTitle(event.target.value)}/>
                </LFFormElement>
            </div>
            <div className="lg:flex-grow md:w-1/2 pr-4">
                <LFFormElement labelValue='Underlined text' labelName='heroUnderlinedText'
                               elemValue={alternatingFeatures?.underlinedText}>
                    <TextInput id="heroUnderlinedText" placeholder="underlined text for the Hero Block"
                               value={alternatingFeatures?.underlinedText} required
                               onChange={(event) => setAlternatingFeaturesUnderlinedText(event.target.value)}/>
                </LFFormElement>
            </div>
        </LFFormSection>
        <LFFormSection sectionTitle={'Alternating Features - Blocks'}>
            {alternatingFeatures?.blocks.map((feature) => {
                return (<div key={feature?._id.toString()} className="sm:w-1/2 px-4">
                    <LFFormElement labelValue='Tagline' labelName={`feature-block-tagline-${feature?._id.toString()}`}
                                   elemValue={feature?.tagline}>
                        <TextInput id={`feature-block-tagline-${feature?._id.toString()}`}
                                   placeholder="Tagline for the Feature Block"
                                   value={feature?.tagline} required
                                   onChange={(event) =>
                                       setAFBlockTagline(feature?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue='Headline' labelName={`feature-block-headline-${feature?._id.toString()}`}
                                   elemValue={feature?.headline}>
                        <TextInput id={`feature-block-headline-${feature?._id.toString()}`}
                                   placeholder="Headline for the Feature Block"
                                   value={feature?.headline} required
                                   onChange={(event) =>
                                       setAFBlockHeadline(feature?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue='Text' labelName={`feature-block-text-${feature?._id.toString()}`}
                                   elemValue={feature?.text}>
                        <Textarea id={`feature-block-text-${feature?._id.toString()}`}
                                  placeholder="Text for the Feature Block"
                                  value={feature?.text} required className='h-text-area'
                                  onChange={(event) =>
                                      setAFBlockText(feature?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <ImageBlock imagePath={feature?.image.src}/>
                </div>)
            })}
        </LFFormSection>
    </Fragment>
}
export default AlternatingFeatures;