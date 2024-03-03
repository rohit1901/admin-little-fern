'use client'
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useHomePageStore} from "@admin/store";
import {ImageBlock} from "@admin/components/ImageBlock";

const SchoolFeaturesItems = () => {
    const {
        homePageData, setFeatureTagline, setFeatureHeadline, setFeatureText
    } = useHomePageStore(state => state)
    return <LFFormSection sectionTitle='School Features Block'>
        {homePageData?.schoolFeatures?.featureBlocks?.map(block => {
            return (<div key={block._id.toString()} className="sm:w-1/2 px-4">
                    <LFFormElement labelValue="School Feature Headline" labelName={`sffbh${block._id.toString()}`}
                                   elemValue={block.headline}>
                        <TextInput id={`sffbh${block._id.toString()}`} type="text"
                                   placeholder="School features block headline"
                                   value={block.headline} required onChange={(event) => {
                            setFeatureHeadline(block._id, event.currentTarget.value)
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="School feature tagline" labelName={`sffbt${block._id.toString()}`}
                                   elemValue={block.tagline}>
                        <TextInput id={`sffbt${block._id.toString()}`} type="text"
                                   placeholder="School features features block tagline"
                                   value={block.tagline} required onChange={(event) => {
                            setFeatureTagline(block._id, event.currentTarget.value)
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="School feature text" labelName={`sffbtx${block._id.toString()}`}
                                   elemValue={block.text}>
                        <TextInput id={`sffbtx${block._id.toString()}`} type="text"
                                   placeholder="School features features block text"
                                   value={block.text} required onChange={(event) => {
                            setFeatureText(block._id, event.currentTarget.value)
                        }}/>
                    </LFFormElement>
                    <ImageBlock imagePath={block.portraitImage?.src}/>
                    <ImageBlock imagePath={block.squareImage?.src}/>
                </div>
            )
        })}
    </LFFormSection>
}
export default SchoolFeaturesItems;