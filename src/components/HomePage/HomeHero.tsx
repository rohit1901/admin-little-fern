import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";
import {useHomePageStore} from "@admin/store";

const HomeHero = () => {
    const {
        setHomePageHeroHeadline,
        setHomePageHeroText,
        setHomePageHeroTagline,
        setYouTubeLink,
        homePageData
    } = useHomePageStore(state => state)
    return <Fragment>
        <LFFormSection sectionTitle='Hero Block'>
            <LFFormElement labelValue='Tagline' labelName='tagline'>
                <TextInput id="tagline" type="text" placeholder="Tagline for the Hero Block"
                           value={homePageData.homeHero?.hero?.tagline} required
                           onChange={(e) => setHomePageHeroTagline(e.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Headline" labelName="headline">
                <TextInput id="headline" type="text" placeholder="Headline for the Hero Block"
                           value={homePageData.homeHero?.hero?.headline} required
                           onChange={(e) => setHomePageHeroHeadline(e.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Text" labelName="text">
                <Textarea id="text" placeholder="Text for the Hero Block"
                          value={homePageData.homeHero?.hero?.text} required className='h-text-area'
                          onChange={(e) => setHomePageHeroText(e.currentTarget.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="YouTube Video Link" labelName="youtube">
                <TextInput id="youtube" placeholder="YouTube Video Link"
                           value={homePageData.homeHero?.hero?.youTubeLink} required
                           onChange={(e) => setYouTubeLink(e.currentTarget.value)}/>
            </LFFormElement>
            <Dropzone imagePath={homePageData.homeHero?.hero?.image?.src} withPopover/>
        </LFFormSection>
    </Fragment>
}
export default HomeHero;