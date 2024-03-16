import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {LFDates} from "@admin/components/LFDates";
import {LFSchedule} from "@admin/components/LFSchedule";
import LFFormSection from "@admin/components/LFFormSection";
import {InfoSection} from "@admin/types";
import {useSchoolProgramsPageStore} from "@admin/store";

type ProgramInfoProps = {
    infoSection: InfoSection
    programId: string
}
export const ProgramInfo = ({infoSection, programId}: ProgramInfoProps) => {
    const {
        setProgramInfoSectionAges,
        setProgramInfoSectionClassSize,
        setProgramInfoSectionDates,
        setProgramInfoSectionHeadline,
        setProgramInfoSectionSchedule,
        setProgramInfoSectionText,
    } = useSchoolProgramsPageStore()
    return <LFFormSection sectionTitle={'Program Info'}>
        <div
            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
            <LFFormElement labelValue="Headline" labelName="program-info-headline"
                           elemValue={infoSection?.headline}>
                <TextInput id="program-info-headline" placeholder="Headline for the Info Block"
                           value={infoSection?.headline} required
                           onChange={(event) => setProgramInfoSectionHeadline(programId, event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Text" labelName="program-info-text"
                           elemValue={infoSection?.text}>
                <Textarea id="program-info-text" placeholder="Text for the Info Block" className="h-text-area"
                          value={infoSection?.text} required
                          onChange={(event) => setProgramInfoSectionText(programId, event.target.value)}/>
            </LFFormElement>
        </div>
        <div
            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16">
            <LFFormElement labelValue="Ages" labelName="program-info-ages"
                           elemValue={infoSection?.ages}>
                <TextInput id="program-info-ages" placeholder="Ages for the Info Block"
                           value={infoSection?.ages} required
                           onChange={(event) => setProgramInfoSectionAges(programId, event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Dates"
                           elemValue={infoSection?.dates}>
                <LFDates dateString={infoSection?.dates}
                         action={(dates) => setProgramInfoSectionDates(programId, dates)}/>
            </LFFormElement>
            <LFFormElement labelValue="Schedule"
                           elemValue={infoSection?.schedule}>
                <LFSchedule scheduleString={infoSection?.schedule}
                            action={(scheduleString) => setProgramInfoSectionSchedule(programId, scheduleString)}/>
            </LFFormElement>
            <LFFormElement labelValue="Class Size" labelName="program-info-class-size"
                           elemValue={infoSection?.classSize}>
                <TextInput id="program-info-class-size" placeholder="Class Size for the Info Block"
                           value={infoSection?.classSize} required
                           onChange={(event) => setProgramInfoSectionClassSize(programId, event.target.value)}/>
            </LFFormElement>
        </div>
    </LFFormSection>
}