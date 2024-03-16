'use client'
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Badge, TextInput} from "flowbite-react";
import {HiX} from "react-icons/hi";
import {useGalleryPageStore} from "@admin/store/";
import {ImageBlock} from "@admin/components/ImageBlock";

const GalleryWithTags = () => {
    const {galleryPageData, setGalleryItemTag} = useGalleryPageStore()

    return <Fragment>
        <LFFormSection sectionTitle={'Gallery Items'} wrap>
            {galleryPageData?.gallery?.map((galleryItem) => {
                return <div key={galleryItem._id.toString()} className="sm:w-1/2 px-4">
                    <LFFormElement labelValue='Tag' labelName={`gallery-tag-${galleryItem._id.toString()}`} elemValue={galleryItem.tag}>
                        {galleryItem.tag && <div className="flex py-4">
                            <Badge color="green" icon={HiX} size='sm'
                                   onClick={(e) =>
                                       setGalleryItemTag(galleryItem._id.toString(), '')}>{galleryItem.tag}</Badge>
                        </div>}
                        <TextInput id={`gallery-tag-${galleryItem._id.toString()}`} placeholder="Tag for the Gallery Item"
                                   value={galleryItem.tag} required
                                   onChange={(event) =>
                                       setGalleryItemTag(galleryItem._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <div className="text-center">
                        <ImageBlock imagePath={galleryItem.src}/>
                    </div>
                </div>
            })}
        </LFFormSection>
    </Fragment>
}
export default GalleryWithTags
