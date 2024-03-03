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
            <div className="sm:w-1/2 px-4">
                <LFFormElement labelValue='Headline' labelName='text-block-headline'
                               elemValue={galleryPageData?.textBlock?.headline}>
                    <TextInput id="text-block-headline" placeholder="Headline for the Hero Block"
                               value={galleryPageData?.textBlock?.headline} required
                               onChange={(event) => setTextBlockHeadline(event.target.value)}/>
                </LFFormElement>
            </div>
            <div className="sm:w-1/2 px-4">
                <LFFormElement labelValue='Text' labelName='text-block-text'
                               elemValue={galleryPageData?.textBlock?.text}>
                    <TextInput id="text-block-text" placeholder="Text for the Text Block"
                               value={galleryPageData?.textBlock?.text} required
                               onChange={(event) => setTextBlockText(event.target.value)}/>
                </LFFormElement>
            </div>
        </LFFormSection>
    </Fragment>
}
export default GalleryTextBlock