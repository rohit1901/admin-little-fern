import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useGalleryPageStore} from "@admin/store/useGalleryPageStore";

const GalleryHero = () => {
    const {galleryPageData, setGalleryHeroHeadline, setGalleryHeroTagline, setGalleryHeroText} = useGalleryPageStore()
    return <Fragment>
        <LFFormSection sectionTitle={'Gallery Hero Block'}>
            <LFFormElement labelValue="Tagline" labelName="gallery-hero-tagline">
                <TextInput id="gallery-hero-tagline" placeholder="Tagline for the Hero Block"
                           value={galleryPageData?.pageHero?.tagline} required
                           onChange={(event) => setGalleryHeroTagline(event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Headline" labelName="gallery-hero-headline">
                <TextInput id="gallery-hero-headline" placeholder="Headline for the Hero Block"
                           value={galleryPageData?.pageHero?.headline} required
                           onChange={(event) => setGalleryHeroHeadline(event.target.value)}/>
            </LFFormElement>
            {/*text*/}
            <LFFormElement labelValue="Text" labelName="gallery-hero-text">
                <Textarea id="gallery-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                          value={galleryPageData?.pageHero?.text} required
                          onChange={(event) => setGalleryHeroText(event.target.value)}/>
            </LFFormElement>
        </LFFormSection>
    </Fragment>
}
export default GalleryHero