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
            <div className="lg:flex-grow md:w-1/2 pr-4">
                {parentsPageData?.hero?.tagline && <LFFormElement labelValue="Tagline" labelName="parents-hero-tagline">
                    <TextInput id="parents-hero-tagline" placeholder="Tagline for the Hero Block"
                               value={parentsPageData?.hero?.tagline} required
                               onChange={(event) => setHeroTagline(event.target.value)}/>
                </LFFormElement>}
                {parentsPageData?.hero?.headline &&
                    <LFFormElement labelValue="Headline" labelName="parents-hero-headline">
                        <TextInput id="parents-hero-headline" placeholder="Headline for the Hero Block"
                                   value={parentsPageData?.hero?.headline} required
                                   onChange={(event) => setHeroHeadline(event.target.value)}/>
                    </LFFormElement>}
            </div>
            {/*text*/}
            <div className="lg:flex-grow md:w-1/2 pr-4">
                {parentsPageData?.hero?.text && <LFFormElement labelValue="Text" labelName="parents-hero-text">
                    <Textarea id="parents-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                              value={parentsPageData?.hero?.text} required
                              onChange={(event) => setHeroText(event.target.value)}/>
                </LFFormElement>}
            </div>
        </LFFormSection>
        <LFFormSection sectionTitle={'Parents Hero Items'}>
            {/*items*/}
            {parentsPageData?.heroItems?.map((item, index) => {
                return <div key={item._id.toString()} className="lg:flex-grow md:w-1/2 pr-4">
                    <LFFormElement labelValue={`Label ${index + 1}`}
                                   labelName={`parents-hero-item-label${item._id.toString()}`}>
                        <TextInput id={`parents-hero-item-label${item._id.toString()}`}
                                   placeholder='Parents Hero Item Label'
                                   value={item?.label} required
                                   onChange={(event) => setHeroItemLabel(item._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue={`Description ${index + 1}`}
                                   labelName={`parents-hero-item-desc-${item._id.toString()}`}>
                        <Textarea id={`parents-hero-item-desc-${item._id.toString()}`}
                                  placeholder='Parents Hero Item Description'
                                  value={item?.description} required className='h-text-area'
                                  onChange={(event) => setHeroItemDescription(item._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </div>
            })}
        </LFFormSection>
    </Fragment>
}
export default ParentsHero