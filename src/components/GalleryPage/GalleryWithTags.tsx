import {GalleryItem} from "@admin/types";
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import Dropzone from "@admin/components/Dropzone";
import LFFormElement from "@admin/components/LFFormElement";
import {Badge, TextInput} from "flowbite-react";
import {HiX} from "react-icons/hi";

type GalleryWithTagsProps = {
    galleryItems: GalleryItem[]
}
const GalleryWithTags = ({galleryItems}: GalleryWithTagsProps) => {
    // create a function to get unique tags from the gallery items
    const getUniqueTags = (galleryItems: GalleryItem[]) => {
        const badges = galleryItems.map((galleryItem) => galleryItem.tag)
        const set = new Set(badges)
        return Array.from(set)
    }

    return <Fragment>
        <LFFormSection sectionTitle={'Gallery Items'}>
            {galleryItems.map((galleryItem) => {
                return <Fragment key={`gallery-item-${galleryItem.src}`}>
                    <Dropzone imagePath={galleryItem.src} withPopover/>
                    <LFFormElement labelValue='Tag' labelName='gallery-tag'>
                        <div className="flex flex-row gap-2.5">
                            <Badge color="green" icon={HiX} size='sm'
                                   onClick={(e) => console.log(e.currentTarget.textContent)}>{galleryItem.tag}</Badge>
                            <TextInput id="gallery-tag" placeholder="Tag for the Gallery Item"
                                       value={galleryItem.tag} required onChange={(event) => {
                                // update the title
                            }}/>
                        </div>
                    </LFFormElement>
                </Fragment>
            })}
        </LFFormSection>
    </Fragment>
}
export default GalleryWithTags
