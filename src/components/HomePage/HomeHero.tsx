import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {HomeHeroBlock} from "@admin/types";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";

type HomeHeroProps = {
    homeHero: HomeHeroBlock,
}
const HomeHero = ({homeHero}: HomeHeroProps) => {
    const onChange = (homeHero: HomeHeroBlock, value?: string) => {
        //
    }
    return <Fragment>
        <LFFormSection sectionTitle='Hero Block'>
            <LFFormElement labelValue='Tagline' labelName='tagline'>
                <TextInput id="tagline" type="text" placeholder="Tagline for the Hero Block"
                           value={homeHero.hero?.tagline} required/>
            </LFFormElement>
            <LFFormElement labelValue="Headline" labelName="headline">
                <TextInput id="headline" type="text" placeholder="Headline for the Hero Block"
                           value={homeHero.hero?.headline} required/>
            </LFFormElement>
            <LFFormElement labelValue="Text" labelName="text">
                <Textarea id="text" placeholder="Text for the Hero Block"
                          value={homeHero.hero?.text} required className='h-text-area'/>
            </LFFormElement>
            <LFFormElement labelValue="YouTube Video Link" labelName="youtube">
                <TextInput id="youtube" placeholder="YouTube Video Link"
                           value={homeHero.hero?.youTubeLink} required/>
            </LFFormElement>
            <Dropzone imagePath={homeHero.hero?.image?.src} withPopover/>
        </LFFormSection>
    </Fragment>
}
export default HomeHero;