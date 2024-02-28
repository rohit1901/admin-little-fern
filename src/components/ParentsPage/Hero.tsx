'use client'
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useParentsPageStore} from "@admin/store/useParentsPageStore";

const ParentsHero = () => {
    const {
        parentsPageData,
        setHeroHeadline,
        setHeroItemDescription,
        setHeroItemHref,
        setHeroItemIcon,
        setHeroItemLabel,
        setHeroTagline,
        setHeroText
    } = useParentsPageStore()
    return <Fragment>
        <LFFormSection sectionTitle={'Parents Hero Block'}>
            <LFFormElement labelValue="Tagline" labelName="parents-hero-tagline">
                <TextInput id="parents-hero-tagline" placeholder="Tagline for the Hero Block"
                           value={parentsPageData?.hero?.tagline} required
                           onChange={(event) => setHeroTagline(event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Headline" labelName="parents-hero-headline">
                <TextInput id="parents-hero-headline" placeholder="Headline for the Hero Block"
                           value={parentsPageData?.hero?.headline} required
                           onChange={(event) => setHeroHeadline(event.target.value)}/>
            </LFFormElement>
            {/*text*/}
            <LFFormElement labelValue="Text" labelName="parents-hero-text">
                <Textarea id="parents-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                          value={parentsPageData?.hero?.text} required
                          onChange={(event) => setHeroText(event.target.value)}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'Parents Hero Items'}>
            {/*items*/}
            {parentsPageData?.heroItems?.map((item, index) => {
                return <Fragment key={item._id.toString()}>
                    <LFFormElement labelValue={`Label ${index + 1}`}
                                   labelName={`parents-hero-item-${index}`}>
                        <TextInput id={`parents-hero-item-label`} placeholder='Parents Hero Item Label'
                                   value={item?.label} required
                                   onChange={(event) => setHeroItemLabel(item._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue={`Description ${index + 1}`}
                                   labelName={`parents-hero-item-${index}`}>
                        <TextInput id={`parents-hero-item-description`} placeholder='Parents Hero Item Description'
                                   value={item?.description} required
                                   onChange={(event) => setHeroItemDescription(item._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue={`Icon ${index + 1}`}
                                   labelName={`parents-hero-item-${index}`}>
                        <TextInput id={`parents-hero-item-icon`} placeholder='Parents Hero Item Icon'
                                   value={item?.icon} required
                                   onChange={(event) => setHeroItemIcon(item._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue={`Href ${index + 1}`}
                                   labelName={`parents-hero-item-${index}`}>
                        <TextInput id={`parents-hero-item-href`} placeholder='Parents Hero Item Href'
                                   value={item?.href} required
                                   onChange={(event) => setHeroItemHref(item._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </Fragment>
            })}
        </LFFormSection>
    </Fragment>
}
export default ParentsHero