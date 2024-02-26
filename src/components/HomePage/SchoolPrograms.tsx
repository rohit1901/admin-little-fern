'use client'
import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import Dropzone from "@admin/components/Dropzone";
import LFFormSection from "@admin/components/LFFormSection";
import {useHomePageStore} from "@admin/store";

const SchoolPrograms = () => {
    const {
        homePageData: {schoolProgramsBlock},
        setSchoolProgramsHeading,
        setSchoolProgramHeroHeadline,
        setSchoolProgramHeroTagline,
        setSchoolProgramHeroText
    } = useHomePageStore(state => state)
    return <Fragment>
        <LFFormSection sectionTitle='School Programs'>
            <LFFormElement labelValue="School Programs Heading" labelName='schoolProgramsHeading'>
                <TextInput id="schoolProgramsHeading" type="text" placeholder="School Programs Heading"
                           value={schoolProgramsBlock?.heading} required onChange={(event) => {
                    setSchoolProgramsHeading(event.currentTarget.value)
                }}/>
            </LFFormElement>
            {/*School Programs*/}
            {schoolProgramsBlock?.schoolPrograms?.slice(0, 3).map(({hero, _id}) => {
                return (<Fragment key={_id.toString()}>
                    <LFFormElement labelValue="Program Tagline" labelName='programTagline'>
                        <TextInput id="programTagline" type="text" placeholder="Program Tagline"
                                   value={hero.tagline} required
                                   onChange={(event) => setSchoolProgramHeroTagline(_id, event.currentTarget.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Program Headline" labelName='programHeadline'>
                        <TextInput id="programHeadline" type="text" placeholder="Program Headline"
                                   value={hero.headline} required
                                   onChange={(event) => setSchoolProgramHeroHeadline(_id, event.currentTarget.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Program Text" labelName='programText'>
                        <TextInput id="programText" type="text" placeholder="Program Text"
                                   value={hero.text} required
                                   onChange={(event) => setSchoolProgramHeroText(_id, event.currentTarget.value)}/>
                    </LFFormElement>
                    <Dropzone imagePath={hero.image?.src} withPopover/>
                </Fragment>)
            })}
        </LFFormSection>
    </Fragment>
}
export default SchoolPrograms;