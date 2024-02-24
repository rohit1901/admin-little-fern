import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {Hero} from "@admin/types";

type GalleryHeroProps = {
    galleryHero?: Hero
}
const GalleryHero = ({galleryHero}: GalleryHeroProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'Gallery Hero Block'}>
            <LFFormElement labelValue="Tagline" labelName="gallery-hero-tagline">
                <TextInput id="gallery-hero-tagline" placeholder="Tagline for the Hero Block"
                           value={galleryHero?.tagline} required onChange={(event) => {
                    // update the title
                }}/>
            </LFFormElement>
            <LFFormElement labelValue="Headline" labelName="gallery-hero-headline">
                <TextInput id="gallery-hero-headline" placeholder="Headline for the Hero Block"
                           value={galleryHero?.headline} required onChange={(event) => {
                    // update the title
                }}/>
            </LFFormElement>
            {/*text*/}
            <LFFormElement labelValue="Text" labelName="gallery-hero-text">
                <Textarea id="gallery-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                          value={galleryHero?.text} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
        </LFFormSection>
    </Fragment>
}
export default GalleryHero