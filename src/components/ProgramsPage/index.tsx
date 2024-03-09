'use client'
import {SchoolProgram} from "@admin/types";
import LFFormSection from "@admin/components/LFFormSection";
import LFForm from "@admin/components/LFForm";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useSchoolProgramsPageStore} from "@admin/store/";
import {WithId} from "mongodb";
import {ImageBlock} from "@admin/components/ImageBlock";
import {ProgramTabs} from "@admin/components/ProgramTabs";

type ProgramsPageProps = {
    schoolProgram: WithId<SchoolProgram>
}
const ProgramsPage = ({schoolProgram}: ProgramsPageProps) => {
    const {
        programs,
        setProgramHeroHeadline,
        setProgramHeroTagline,
        setProgramHeroText,
        setProgramInfoSectionAges,
        setProgramInfoSectionClassSize,
        setProgramInfoSectionDates,
        setProgramInfoSectionHeadline,
        setProgramInfoSectionSchedule,
        setProgramInfoSectionText,
        setProgramDescriptionSectionText,
        setProgramPricingSectionHeadline,
        setProgramPricingSectionTagline,
        setProgramPricingSectionText,
        setProgramPricingSectionPricing1Interval,
        setProgramPricingSectionPricing1Name,
        setProgramPricingSectionPricing1Price,
        setProgramPricingSectionPricing1ShortDescription,
        setPricing1Feature,
        setProgramPricingSectionPricing2Interval,
        setProgramPricingSectionPricing2Name,
        setProgramPricingSectionPricing2Price,
        setProgramPricingSectionPricing2ShortDescription,
        setPricing2Feature
    } = useSchoolProgramsPageStore()
    return <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <ProgramTabs programs={programs}/>
        <LFForm isProgram>
            <LFFormSection sectionTitle={`${schoolProgram?.name} Program`}>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    <ImageBlock imagePath={schoolProgram?.hero?.image?.src}/>
                </div>
                <div className="lg:flex-grow md:w-1/2">
                    <LFFormElement labelValue="Tagline" labelName="program-hero-tagline"
                                   elemValue={schoolProgram?.hero?.tagline}>
                        <TextInput id="program-hero-tagline" placeholder="Tagline for the Hero Block"
                                   value={schoolProgram?.hero?.tagline} required
                                   onChange={(event) => setProgramHeroTagline(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Headline" labelName="program-hero-headline"
                                   elemValue={schoolProgram?.hero?.headline}>
                        <TextInput id="program-hero-headline" placeholder="Headline for the Hero Block"
                                   value={schoolProgram?.hero?.headline} required
                                   onChange={(event) => setProgramHeroHeadline(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Text" labelName="program-hero-text"
                                   elemValue={schoolProgram?.hero?.text}>
                        <Textarea id="program-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                                  value={schoolProgram?.hero?.text} required
                                  onChange={(event) => setProgramHeroText(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </div>
            </LFFormSection>
            <LFFormSection sectionTitle={'Program Info'}>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    <LFFormElement labelValue="Headline" labelName="program-info-headline"
                                   elemValue={schoolProgram?.infoSection?.headline}>
                        <TextInput id="program-info-headline" placeholder="Headline for the Info Block"
                                   value={schoolProgram?.infoSection?.headline} required
                                   onChange={(event) => setProgramInfoSectionHeadline(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Text" labelName="program-info-text"
                                   elemValue={schoolProgram?.infoSection?.text}>
                        <Textarea id="program-info-text" placeholder="Text for the Info Block" className="h-text-area"
                                  value={schoolProgram?.infoSection?.text} required
                                  onChange={(event) => setProgramInfoSectionText(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </div>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    <LFFormElement labelValue="Ages" labelName="program-info-ages"
                                   elemValue={schoolProgram?.infoSection?.ages}>
                        <TextInput id="program-info-ages" placeholder="Ages for the Info Block"
                                   value={schoolProgram?.infoSection?.ages} required
                                   onChange={(event) => setProgramInfoSectionAges(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Dates" labelName="program-info-dates"
                                   elemValue={schoolProgram?.infoSection?.dates}>
                        <TextInput id="program-info-dates" placeholder="Dates for the Info Block"
                                   value={schoolProgram?.infoSection?.dates} required
                                   onChange={(event) => setProgramInfoSectionDates(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Schedule" labelName="program-info-schedule"
                                   elemValue={schoolProgram?.infoSection?.schedule}>
                        <TextInput id="program-info-schedule" placeholder="Schedule for the Info Block"
                                   value={schoolProgram?.infoSection?.schedule} required
                                   onChange={(event) => setProgramInfoSectionSchedule(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Class Size" labelName="program-info-class-size"
                                   elemValue={schoolProgram?.infoSection?.classSize}>
                        <TextInput id="program-info-class-size" placeholder="Class Size for the Info Block"
                                   value={schoolProgram?.infoSection?.classSize} required
                                   onChange={(event) => setProgramInfoSectionClassSize(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </div>
            </LFFormSection>
            <LFFormSection sectionTitle={'Program Images'} isGallery>
                <div
                    className="m-4 text-center">
                    <ImageBlock imagePath={schoolProgram?.descriptionSection?.portraitImage}/>
                </div>
                <div
                    className="m-4 text-center">
                    <ImageBlock imagePath={schoolProgram?.descriptionSection?.squareImage1}/>
                </div>
                <div
                    className="m-4 text-center">
                    <ImageBlock imagePath={schoolProgram?.descriptionSection?.squareImage2}/>
                </div>
            </LFFormSection>
            <LFFormSection sectionTitle={'Program Description'}>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    <LFFormElement labelValue="Text" labelName="program-description-text"
                                   elemValue={schoolProgram?.descriptionSection?.text}>
                        <Textarea id="program-description-text" placeholder="Text for the Description Block"
                                  className="h-text-area"
                                  value={schoolProgram?.descriptionSection?.text} required
                                  onChange={(event) => setProgramDescriptionSectionText(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </div>
            </LFFormSection>
            <LFFormSection sectionTitle={'Program Pricing'}>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    <LFFormElement labelValue="Tagline" labelName="program-pricing-tagline"
                                   elemValue={schoolProgram?.pricingSection?.tagline}>
                        <TextInput id="program-pricing-tagline" placeholder="Tagline for the Pricing Block"
                                   value={schoolProgram?.pricingSection?.tagline} required
                                   onChange={(event) => setProgramPricingSectionTagline(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Headline" labelName="program-pricing-headline"
                                   elemValue={schoolProgram?.pricingSection?.headline}>
                        <TextInput id="program-pricing-headline" placeholder="Headline for the Pricing Block"
                                   value={schoolProgram?.pricingSection?.headline} required
                                   onChange={(event) => setProgramPricingSectionHeadline(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Text" labelName="program-pricing-text"
                                   elemValue={schoolProgram?.pricingSection?.text}>
                        <Textarea id="program-pricing-text" placeholder="Text for the Pricing Block"
                                  className="h-text-area"
                                  value={schoolProgram?.pricingSection?.text} required
                                  onChange={(event) => setProgramPricingSectionText(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Name" labelName="program-pricing1-name"
                                   elemValue={schoolProgram?.pricingSection?.pricing1?.name}>
                        <TextInput id="program-pricing1-name" placeholder="Name for the Pricing1 Block"
                                   value={schoolProgram?.pricingSection?.pricing1?.name} required
                                   onChange={(event) => setProgramPricingSectionPricing1Name(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </div>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    <LFFormElement labelValue="Price" labelName="program-pricing1-price"
                                   elemValue={schoolProgram?.pricingSection?.pricing1?.price}>
                        <TextInput id="program-pricing1-price" placeholder="Price for the Pricing1 Block"
                                   value={schoolProgram?.pricingSection?.pricing1?.price} required
                                   onChange={(event) => setProgramPricingSectionPricing1Price(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Interval" labelName="program-pricing1-interval"
                                   elemValue={schoolProgram?.pricingSection?.pricing1?.interval}>
                        <TextInput id="program-pricing1-interval" placeholder="Interval for the Pricing1 Block"
                                   value={schoolProgram?.pricingSection?.pricing1?.interval} required
                                   onChange={(event) => setProgramPricingSectionPricing1Interval(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Short Description" labelName="program-pricing1-short-description"
                                   elemValue={schoolProgram?.pricingSection?.pricing1?.shortDescription}>
                        <TextInput id="program-pricing1-short-description"
                                   placeholder="Short Description for the Pricing1 Block"
                                   value={schoolProgram?.pricingSection?.pricing1?.shortDescription} required
                                   onChange={(event) =>
                                       setProgramPricingSectionPricing1ShortDescription(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </div>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    {schoolProgram?.pricingSection?.pricing1?.features.map((feature, index) => {
                        return <LFFormElement key={feature._id.toString()} labelValue={`Feature ${index + 1}`}
                                              labelName={`program-pricing1-feature-${feature._id.toString()}`} elemValue={feature.feature}>
                            <TextInput id={`program-pricing1-feature-${feature._id.toString()}`} placeholder='Feature'
                                       value={feature?.feature} required onChange={(event) => {
                                setPricing1Feature(schoolProgram?.slug, feature._id.toString(), event.target.value)
                            }}/>
                        </LFFormElement>
                    })}
                </div>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    <LFFormElement labelValue="Name" labelName="program-pricing2-name"
                                   elemValue={schoolProgram?.pricingSection?.pricing2?.name}>
                        <TextInput id="program-pricing2-name" placeholder="Name for the Pricing2 Block"
                                   value={schoolProgram?.pricingSection?.pricing2?.name} required
                                   onChange={(event) => setProgramPricingSectionPricing2Name(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Price" labelName="program-pricing2-price"
                                   elemValue={schoolProgram?.pricingSection?.pricing2?.price}>
                        <TextInput id="program-pricing2-price" placeholder="Price for the Pricing2 Block"
                                   value={schoolProgram?.pricingSection?.pricing2?.price} required
                                   onChange={(event) => setProgramPricingSectionPricing2Price(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Interval" labelName="program-pricing2-interval"
                                   elemValue={schoolProgram?.pricingSection?.pricing2?.interval}>
                        <TextInput id="program-pricing2-interval" placeholder="Interval for the Pricing2 Block"
                                   value={schoolProgram?.pricingSection?.pricing2?.interval} required
                                   onChange={(event) => setProgramPricingSectionPricing2Interval(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Short Description" labelName="program-pricing2-short-description"
                                   elemValue={schoolProgram?.pricingSection?.pricing2?.shortDescription}>
                        <TextInput id="program-pricing2-short-description"
                                   placeholder="Short Description for the Pricing2 Block"
                                   value={schoolProgram?.pricingSection?.pricing2?.shortDescription} required
                                   onChange={(event) =>
                                       setProgramPricingSectionPricing2ShortDescription(schoolProgram?._id.toString(), event.target.value)}/>
                    </LFFormElement>
                </div>
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
                    {schoolProgram?.pricingSection?.pricing2?.features.map((feature, index) => {
                        return <LFFormElement key={feature._id.toString()} labelValue={`Feature ${index + 1}`}
                                              labelName={`program-pricing2-feature-${feature._id.toString()}`} elemValue={feature.feature}>
                            <TextInput id={`program-pricing2-feature-${feature._id.toString()}`} placeholder='Feature'
                                       value={feature?.feature} required onChange={(event) => {
                                setPricing2Feature(schoolProgram?.slug, feature._id.toString(), event.target.value)
                            }}/>
                        </LFFormElement>
                    })}
                </div>
            </LFFormSection>
        </LFForm>
    </div>

}
export default ProgramsPage