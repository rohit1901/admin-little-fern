import {GalleryItem} from "@admin/types";
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import Dropzone from "@admin/components/Dropzone";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";

type GalleryWithTagsProps = {
    galleryItems: GalleryItem[]
}
const GalleryWithTags = ({galleryItems}: GalleryWithTagsProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'Gallery Items'}>
            {galleryItems.map((galleryItem) => {
                return <Fragment key={`gallery-item-${galleryItem.src}`}>
                    <Dropzone imagePath={galleryItem.src} withPopover/>
                    <LFFormElement labelValue='Tag' labelName='gallery-tag'>
                        <TextInput id="gallery-tag" placeholder="Tag for the Gallery Item"
                                   value={galleryItem.tag} required onChange={(event) => {
                            // update the title
                        }}/>
                    </LFFormElement>
                </Fragment>
            })}
        </LFFormSection>
    </Fragment>
}
export default GalleryWithTags
