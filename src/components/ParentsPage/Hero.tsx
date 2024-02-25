import {Hero, ParentsHeroItem} from "@admin/types";
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";

type ParentsHeroProps = {
    parentsHero: Hero
    heroItems: ParentsHeroItem[]
}
const ParentsHero = ({parentsHero, heroItems}: ParentsHeroProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'Parents Hero Block'}>
            <LFFormElement labelValue="Tagline" labelName="parents-hero-tagline">
                <TextInput id="parents-hero-tagline" placeholder="Tagline for the Hero Block"
                           value={parentsHero?.tagline} required onChange={(event) => {
                    // update the title
                }}/>
            </LFFormElement>
            <LFFormElement labelValue="Headline" labelName="parents-hero-headline">
                <TextInput id="parents-hero-headline" placeholder="Headline for the Hero Block"
                           value={parentsHero?.headline} required onChange={(event) => {
                    // update the title
                }}/>
            </LFFormElement>
            {/*text*/}
            <LFFormElement labelValue="Text" labelName="parents-hero-text">
                <Textarea id="parents-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                          value={parentsHero?.text} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'Parents Hero Items'}>
            {/*items*/}
            {heroItems.map((item, index) => {
                return <LFFormElement key={index} labelValue={`Hero Item ${index + 1}`}
                                      labelName={`parents-hero-item-${index}`}>
                    <TextInput id={`parents-hero-item-label`} placeholder='Parents Hero Item Label'
                               value={item?.label} required onChange={(event) => {
                        // update the title
                    }}/>
                    <TextInput id={`parents-hero-item-description`} placeholder='Parents Hero Item Description'
                               value={item?.description} required onChange={(event) => {
                        // update the title
                    }}/>
                    <TextInput id={`parents-hero-item-icon`} placeholder='Parents Hero Item Icon'
                               value={item?.icon} required onChange={(event) => {
                        // update the title
                    }}/>
                    <TextInput id={`parents-hero-item-href`} placeholder='Parents Hero Item Href'
                               value={item?.href} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
            })}
        </LFFormSection>
    </Fragment>
}
export default ParentsHero