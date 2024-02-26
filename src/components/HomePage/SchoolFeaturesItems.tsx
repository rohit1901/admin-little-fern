'use client'
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";
import {useHomePageStore} from "@admin/store";

const SchoolFeaturesItems = () => {
    const {
        homePageData, setFeatureTagline, setFeatureHeadline, setFeatureText
    } = useHomePageStore(state => state)
    return <Fragment>
        <LFFormSection sectionTitle='School Features Block'>
            {homePageData?.schoolFeatures?.featureBlocks?.map(block => {
                return (<Fragment key={block._id.toString()}>
                        <LFFormElement labelValue="School Feature Headline" labelName='schoolFeatureHeadline'>
                            <TextInput id="sffbh" type="text"
                                       placeholder="School features block headline"
                                       value={block.headline} required onChange={(event) => {
                                setFeatureHeadline(block._id, event.currentTarget.value)
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="School feature tagline" labelName='sffbt'>
                            <TextInput id="sffbt" type="text"
                                       placeholder="School features features block tagline"
                                       value={block.tagline} required onChange={(event) => {
                                setFeatureTagline(block._id, event.currentTarget.value)
                            }}/>
                        </LFFormElement>
                        <LFFormElement labelValue="School feature text" labelName='sffbtx'>
                            <TextInput id="sffbtx" type="text"
                                       placeholder="School features features block text"
                                       value={block.text} required onChange={(event) => {
                                setFeatureText(block._id, event.currentTarget.value)
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