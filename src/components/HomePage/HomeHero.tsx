import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useHomePageStore} from "@admin/store";
import {ImageItem} from "@admin/types";
import {ImageBlock} from "@admin/components/ImageBlock";

type HomeHeroProps = {
    tagline?: string
    headline?: string
    text?: string
    youTubeLink?: string
    image?: ImageItem
}

const HomeHero = ({tagline, headline, text, image, youTubeLink}: HomeHeroProps) => {
    const {
        setHomePageHeroHeadline,
        setHomePageHeroText,
        setHomePageHeroTagline,
        setYouTubeLink,
    } = useHomePageStore(state => state)
    return <LFFormSection sectionTitle={'Home Page'}>
        <div
            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
            <ImageBlock imagePath={image?.src}/>
        </div>
        <div className="lg:flex-grow md:w-1/2">
            <LFFormElement labelValue='Tagline' labelName='tagline' elemValue={tagline}>
                <TextInput id='tagline' type='text' placeholder='Tagline for the Hero Block'
                           value={tagline} required
                           onChange={(e) => setHomePageHeroTagline(e.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Headline" labelName="headline" elemValue={headline}>
                <TextInput id="headline" type="text" placeholder="Headline for the Hero Block"
                           value={headline} required
                           onChange={(e) => setHomePageHeroHeadline(e.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Text" labelName="text" elemValue={text}>
                <Textarea id="text" placeholder="Text for the Hero Block"
                          value={text} required
                          className="w-full h-text-area leading-6 transition-colors duration-200 ease-in-out"
                          onChange={(e) => setHomePageHeroText(e.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="YouTube Video Link" labelName="youtube" elemValue={youTubeLink}>
                <TextInput id="youtube" type="text" placeholder="YouTube Video Link"
                           value={youTubeLink} required
                           onChange={(e) => setYouTubeLink(e.currentTarget.value)}/>
            </LFFormElement>
        </div>
    </LFFormSection>
}
export default HomeHero;