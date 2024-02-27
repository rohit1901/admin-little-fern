'use client'
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import {TextInput} from "flowbite-react";
import LFFormElement from "@admin/components/LFFormElement";
import {useGalleryPageStore} from "@admin/store/useGalleryPageStore";

const GalleryTextBlock = () => {
    const {galleryPageData, setTextBlockHeadline, setTextBlockText} = useGalleryPageStore()
    return <Fragment>
        <LFFormSection sectionTitle={'Text Block'}>
            <LFFormElement labelValue='Headline' labelName='text-block-headline'>
                <TextInput id="text-block-headline" placeholder="Headline for the Hero Block"
                           value={galleryPageData?.textBlock?.headline} required
                           onChange={(event) => setTextBlockHeadline(event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue='Text' labelName='text-block-text'>
                <TextInput id="text-block-text" placeholder="Text for the Text Block"
                           value={galleryPageData?.textBlock?.text} required
                           onChange={(event) => setTextBlockText(event.target.value)}/>
            </LFFormElement>
        </LFFormSection>
    </Fragment>
}
export default GalleryTextBlock