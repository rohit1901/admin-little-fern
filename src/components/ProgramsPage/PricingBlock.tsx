import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {PricingPriceBlock} from "@admin/components/ProgramsPage/PricingPriceBlock";
import LFFormSection from "@admin/components/LFFormSection";
import {PricingSection} from "@admin/types";
import {useSchoolProgramsPageStore} from "@admin/store";
import {Fragment} from "react";

type PricingBlockProps = {
    programSlug: string
    pricingSection: PricingSection
    programId: string
}
export const PricingBlock = ({programSlug, pricingSection, programId}: PricingBlockProps) => {
    const {
        setProgramPricingSectionTagline,
        setProgramPricingSectionHeadline,
        setProgramPricingSectionText,
        setProgramPricingSectionPricing1Name
    } = useSchoolProgramsPageStore()
    return (<Fragment>
            <LFFormSection sectionTitle={'Program Pricing Headings'}>
                <div className="lg:flex-grow md:w-1/2 pr-4">
                    <LFFormElement labelValue="Tagline" labelName="program-pricing-tagline"
                                   elemValue={pricingSection?.tagline}>
                        <TextInput id="program-pricing-tagline" placeholder="Tagline for the Pricing Block"
                                   value={pricingSection?.tagline} required
                                   onChange={(event) => setProgramPricingSectionTagline(programId, event.target.value)}/>
                    </LFFormElement>
                </div>
                <div className="lg:flex-grow md:w-1/2 pr-4">
                    <LFFormElement labelValue="Headline" labelName="program-pricing-headline"
                                   elemValue={pricingSection?.headline}>
                        <TextInput id="program-pricing-headline" placeholder="Headline for the Pricing Block"
                                   value={pricingSection?.headline} required
                                   onChange={(event) => setProgramPricingSectionHeadline(programId, event.target.value)}/>
                    </LFFormElement>
                </div>
                <div className="lg:flex-grow md:w-1/2 pr-4">
                    <LFFormElement labelValue="Text" labelName="program-pricing-text"
                                   elemValue={pricingSection?.text}>
                        <Textarea id="program-pricing-text" placeholder="Text for the Pricing Block"
                                  className="h-text-area"
                                  value={pricingSection?.text} required
                                  onChange={(event) => setProgramPricingSectionText(programId, event.target.value)}/>
                    </LFFormElement>
                </div>
                <div className="lg:flex-grow md:w-1/2 pr-4">
                    <LFFormElement labelValue="Name" labelName="program-pricing1-name"
                                   elemValue={pricingSection?.pricing1?.name}>
                        <TextInput id="program-pricing1-name" placeholder="Name for the Pricing1 Block"
                                   value={pricingSection?.pricing1?.name} required
                                   onChange={(event) => setProgramPricingSectionPricing1Name(programId, event.target.value)}/>
                    </LFFormElement>
                </div>
            </LFFormSection>
            <LFFormSection sectionTitle={'Pricing Blocks'} column>
                <PricingPriceBlock programId={programId}
                                   id='1' pricing={pricingSection?.pricing1} programSlug={programSlug}/>

                <PricingPriceBlock programId={programId}
                                   id='2' pricing={pricingSection?.pricing2} programSlug={programSlug}/>
            </LFFormSection>
        </Fragment>
    )
}