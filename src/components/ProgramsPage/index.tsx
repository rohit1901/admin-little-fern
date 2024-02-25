'use client'
import {SchoolProgram} from "@admin/types";
import LFFormSection from "@admin/components/LFFormSection";
import LFForm from "@admin/components/LFForm";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";

type ProgramsPageProps = {
    schoolProgram: SchoolProgram
}
const ProgramsPage = ({schoolProgram}: ProgramsPageProps) => {
    return <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <LFForm>
            <LFFormSection sectionTitle={`${schoolProgram?.name} Program`}>
                <LFFormElement labelValue="Tagline" labelName="program-hero-tagline">
                    <TextInput id="program-hero-tagline" placeholder="Tagline for the Hero Block"
                               value={schoolProgram?.hero?.tagline} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Headline" labelName="program-hero-headline">
                    <TextInput id="program-hero-headline" placeholder="Headline for the Hero Block"
                               value={schoolProgram?.hero?.headline} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Text" labelName="program-hero-text">
                    <Textarea id="program-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                              value={schoolProgram?.hero?.text} required onChange={(event) => {
                        // update the description
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Image" labelName="program-hero-image">
                    <TextInput id="program-hero-image" placeholder="Image for the Hero Block"
                               value={schoolProgram?.hero?.image?.src} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
            </LFFormSection>
            <LFFormSection sectionTitle={'Program Info'}>
                <LFFormElement labelValue="Headline" labelName="program-info-headline">
                    <TextInput id="program-info-headline" placeholder="Headline for the Info Block"
                               value={schoolProgram?.infoSection?.headline} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Text" labelName="program-info-text">
                    <Textarea id="program-info-text" placeholder="Text for the Info Block" className="h-text-area"
                              value={schoolProgram?.infoSection?.text} required onChange={(event) => {
                        // update the description
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Ages" labelName="program-info-ages">
                    <TextInput id="program-info-ages" placeholder="Ages for the Info Block"
                               value={schoolProgram?.infoSection?.ages} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Dates" labelName="program-info-dates">
                    <TextInput id="program-info-dates" placeholder="Dates for the Info Block"
                               value={schoolProgram?.infoSection?.dates} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Schedule" labelName="program-info-schedule">
                    <TextInput id="program-info-schedule" placeholder="Schedule for the Info Block"
                               value={schoolProgram?.infoSection?.schedule} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Class Size" labelName={schoolProgram?.infoSection?.classSize}>
                    <TextInput id="program-info-class-size" placeholder="Class Size for the Info Block"
                               value={schoolProgram?.infoSection?.classSize} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
            </LFFormSection>
            <LFFormSection sectionTitle={'Program Description'}>
                <LFFormElement labelValue="Text" labelName="program-description-text">
                    <Textarea id="program-description-text" placeholder="Text for the Description Block"
                              className="h-text-area"
                              value={schoolProgram?.descriptionSection?.text} required onChange={(event) => {
                        // update the description
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Portrait Image" labelName="program-description-portrait-image">
                    <TextInput id="program-description-portrait-image"
                               placeholder="Portrait Image for the Description Block"
                               value={schoolProgram?.descriptionSection?.portraitImage} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Square Image 1" labelName="program-description-square-image-1">
                    <TextInput id="program-description-square-image-1"
                               placeholder="Square Image 1 for the Description Block"
                               value={schoolProgram?.descriptionSection?.squareImage1} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Square Image 2" labelName="program-description-square-image-2">
                    <TextInput id="program-description-square-image-2"
                               placeholder="Square Image 2 for the Description Block"
                               value={schoolProgram?.descriptionSection?.squareImage2} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
            </LFFormSection>
            <LFFormSection sectionTitle={'Program Pricing'}>
                <LFFormElement labelValue="Tagline" labelName="program-pricing-tagline">
                    <TextInput id="program-pricing-tagline" placeholder="Tagline for the Pricing Block"
                               value={schoolProgram?.pricingSection?.tagline} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Headline" labelName="program-pricing-headline">
                    <TextInput id="program-pricing-headline" placeholder="Headline for the Pricing Block"
                               value={schoolProgram?.pricingSection?.headline} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Text" labelName="program-pricing-text">
                    <Textarea id="program-pricing-text" placeholder="Text for the Pricing Block" className="h-text-area"
                              value={schoolProgram?.pricingSection?.text} required onChange={(event) => {
                        // update the description
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Name" labelName="program-pricing1-name">
                    <TextInput id="program-pricing1-name" placeholder="Name for the Pricing1 Block"
                               value={schoolProgram?.pricingSection?.pricing1?.name} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Price" labelName="program-pricing1-price">
                    <TextInput id="program-pricing1-price" placeholder="Price for the Pricing1 Block"
                               value={schoolProgram?.pricingSection?.pricing1?.price} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Interval" labelName="program-pricing1-interval">
                    <TextInput id="program-pricing1-interval" placeholder="Interval for the Pricing1 Block"
                               value={schoolProgram?.pricingSection?.pricing1?.interval} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Short Description" labelName="program-pricing1-short-description">
                    <TextInput id="program-pricing1-short-description"
                               placeholder="Short Description for the Pricing1 Block"
                               value={schoolProgram?.pricingSection?.pricing1?.shortDescription} required
                               onChange={(event) => {
                                   // update the title
                               }}/>
                </LFFormElement>
                {schoolProgram?.pricingSection?.pricing1?.features.map((feature, index) => {
                    return <LFFormElement key={index} labelValue={`Feature ${index + 1}`}
                                          labelName={`program-pricing1-feature-${index}`}>
                        <TextInput id={`program-pricing1-feature-${index}`} placeholder='Feature'
                                   value={feature?.feature} required onChange={(event) => {
                            // update the title
                        }}/>
                    </LFFormElement>
                })}
                <LFFormElement labelValue="Name" labelName="program-pricing2-name">
                    <TextInput id="program-pricing2-name" placeholder="Name for the Pricing2 Block"
                               value={schoolProgram?.pricingSection?.pricing2?.name} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Price" labelName="program-pricing2-price">
                    <TextInput id="program-pricing2-price" placeholder="Price for the Pricing2 Block"
                               value={schoolProgram?.pricingSection?.pricing2?.price} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Interval" labelName="program-pricing2-interval">
                    <TextInput id="program-pricing2-interval" placeholder="Interval for the Pricing2 Block"
                               value={schoolProgram?.pricingSection?.pricing2?.interval} required onChange={(event) => {
                        // update the title
                    }}/>
                </LFFormElement>
                <LFFormElement labelValue="Short Description" labelName="program-pricing2-short-description">
                    <TextInput id="program-pricing2-short-description"
                               placeholder="Short Description for the Pricing2 Block"
                               value={schoolProgram?.pricingSection?.pricing2?.shortDescription} required
                               onChange={(event) => {
                                   // update the title
                               }}/>
                </LFFormElement>
                {schoolProgram?.pricingSection?.pricing2?.features.map((feature, index) => {
                    return <LFFormElement key={index} labelValue={`Feature ${index + 1}`}
                                          labelName={`program-pricing2-feature-${index}`}>
                        <TextInput id={`program-pricing2-feature-${index}`} placeholder='Feature'
                                   value={feature?.feature} required onChange={(event) => {
                            // update the title
                        }}/>
                    </LFFormElement>
                })}
            </LFFormSection>
        </LFForm>
    </div>

}
export default ProgramsPage