import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";
import {useHomePageStore} from "@admin/store";
import {ImageItem} from "@admin/types";

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
    return <LFFormSection sectionTitle='Hero Block'>
        <LFFormElement labelValue='Tagline' labelName='tagline'>
            {tagline &&
                <TextInput id='tagline' type='text' placeholder='Tagline for the Hero Block'
                           value={tagline} required
                           onChange={(e) => setHomePageHeroTagline(e.currentTarget.value)}/>
            }
        </LFFormElement>
        <LFFormElement labelValue="Headline" labelName="headline">
            {headline &&
                <TextInput id="headline" type="text" placeholder="Headline for the Hero Block"
                           value={headline} required
                           onChange={(e) => setHomePageHeroHeadline(e.currentTarget.value)}/>
            }
        </LFFormElement>
        <LFFormElement labelValue="Text" labelName="text">
            {text &&
                <Textarea id="text" placeholder="Text for the Hero Block"
                          value={text} required
                          onChange={(e) => setHomePageHeroText(e.currentTarget.value)}/>
            }
        </LFFormElement>
        <LFFormElement labelValue="YouTube Video Link" labelName="youtube">
            {youTubeLink &&
                <TextInput id="youtube" type="text" placeholder="YouTube Video Link"
                           value={youTubeLink} required
                           onChange={(e) => setYouTubeLink(e.currentTarget.value)}/>
            }
        </LFFormElement>
        <Dropzone imagePath={image?.src} withPopover/>
    </LFFormSection>
}
export default HomeHero;