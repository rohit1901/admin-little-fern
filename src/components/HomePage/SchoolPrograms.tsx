import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";
import {SchoolProgramsBlock} from "@admin/types";

type SchoolProgramsProps = {
    schoolProgramsBlock: SchoolProgramsBlock
}
const SchoolPrograms = ({schoolProgramsBlock}: SchoolProgramsProps) => {
    return <Fragment>
        <LFFormSection sectionTitle='School Programs'>
            <LFFormElement labelValue="School Programs Heading" labelName='schoolProgramsHeading'>
                <TextInput id="schoolProgramsHeading" type="text" placeholder="School Programs Heading"
                           value={schoolProgramsBlock.heading} required onChange={(event) => {
                    // update the name
                }}/>
            </LFFormElement>
            {/*School Programs*/}
            {schoolProgramsBlock.schoolPrograms?.slice(0, 3).map(({hero}) => {
                return (<Fragment key={hero.tagline}>
                    <LFFormElement labelValue="Program Tagline" labelName='programTagline'>
                        <TextInput id="programTagline" type="text" placeholder="Program Tagline"
                                   value={hero.tagline} required onChange={(event) => {
                            // update the name
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Program Headline" labelName='programHeadline'>
                        <TextInput id="programHeadline" type="text" placeholder="Program Headline"
                                   value={hero.headline} required onChange={(event) => {
                            // update the name
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Program Text" labelName='programText'>
                        <TextInput id="programText" type="text" placeholder="Program Text"
                                   value={hero.text} required onChange={(event) => {
                            // update the name
                        }}/>
                    </LFFormElement>
                    <Dropzone imagePath={hero.image?.src} withPopover/>
                </Fragment>)
            })}
        </LFFormSection>
    </Fragment>
}
export default SchoolPrograms;