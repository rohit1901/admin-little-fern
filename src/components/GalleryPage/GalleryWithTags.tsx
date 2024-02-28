'use client'
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import Dropzone from "@admin/components/Dropzone";
import LFFormElement from "@admin/components/LFFormElement";
import {Badge, TextInput} from "flowbite-react";
import {HiX} from "react-icons/hi";
import {useGalleryPageStore} from "@admin/store/useGalleryPageStore";

const GalleryWithTags = () => {
    const {galleryPageData, setGalleryItemTag} = useGalleryPageStore()

    return <Fragment>
        <LFFormSection sectionTitle={'Gallery Items'}>
            {galleryPageData?.gallery?.map((galleryItem) => {
                return <Fragment key={galleryItem._id.toString()}>
                    <Dropzone imagePath={galleryItem.src} withPopover/>
                    <LFFormElement labelValue='Tag' labelName='gallery-tag'>
                        <div className="flex flex-row gap-2.5">
                            {galleryItem.tag && <Badge color="green" icon={HiX} size='sm'
                                                       onClick={(e) => setGalleryItemTag(galleryItem._id.toString(), '')}>{galleryItem.tag}</Badge>}
                            <TextInput id="gallery-tag" placeholder="Tag for the Gallery Item"
                                       value={galleryItem.tag} required
                                       onChange={(event) => setGalleryItemTag(galleryItem._id.toString(), event.target.value)}/>
                        </div>
                    </LFFormElement>
                </Fragment>
            })}
        </LFFormSection>
    </Fragment>
}
export default GalleryWithTags
