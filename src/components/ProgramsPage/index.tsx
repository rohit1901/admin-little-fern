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
import {PageHeader} from "@admin/components/PageHeader";
import {PricingBlock} from "@admin/components/ProgramsPage/PricingBlock";
import {ProgramInfo} from "@admin/components/ProgramsPage/ProgramInfo";
import {isSchoolProgramsBlock} from "@admin/lib";

type ProgramsPageProps = {
    schoolProgram: WithId<SchoolProgram>
}
const ProgramsPage = ({schoolProgram}: ProgramsPageProps) => {
    const {
        setHeading,
        setPrograms,
        setProgramHeroHeadline,
        setProgramHeroTagline,
        setProgramHeroText,
        setProgramDescriptionSectionText,
    } = useSchoolProgramsPageStore()
    return <div className='p-8 mx-auto 2xl:ml-64 ml-20 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <ProgramTabs/>
        <LFForm isProgram afterSubmit={(data) => {
            if (!isSchoolProgramsBlock(data)) return
            setHeading(data.heading ?? '')
            setPrograms(data.schoolPrograms ?? [])
        }}>
            <PageHeader title={`${schoolProgram?.name} Program`}/>
            <LFFormSection sectionTitle="Headings">
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
            <ProgramInfo infoSection={schoolProgram?.infoSection} programId={schoolProgram?._id.toString()}/>
            <LFFormSection sectionTitle={'Program Images'} wrap>
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
            <PricingBlock programSlug={schoolProgram?.slug} pricingSection={schoolProgram?.pricingSection}
                          programId={schoolProgram?._id.toString()}/>
        </LFForm>
    </div>

}
export default ProgramsPage