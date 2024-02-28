'use client'
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useHomePageStore} from "@admin/store";
import {ImageBlock} from "@admin/components/ImageBlock";

const SchoolPrograms = () => {
    const {
        homePageData: {schoolProgramsBlock},
        setSchoolProgramsHeading,
        setSchoolProgramHeroHeadline,
        setSchoolProgramHeroTagline,
        setSchoolProgramHeroText
    } = useHomePageStore(state => state)
    return <section className="text-gray-600 body-font">
        <div className="pt-20">
            <h1 className="container mx-auto flex px-5 md:flex-row flex-col items-center w-full text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-cyan-800 dark:text-cyan-200">School Programs</span>
            </h1>
        </div>
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col w-1/2 mb-20">
                {schoolProgramsBlock?.heading &&
                    <LFFormElement labelValue="School Programs Heading" labelName='schoolProgramsHeading'>
                        <Textarea id="schoolProgramsHeading" placeholder="School Programs Heading"
                                  className='h-text-area'
                                  value={schoolProgramsBlock?.heading} required onChange={(event) => {
                            setSchoolProgramsHeading(event.currentTarget.value)
                        }}/>
                    </LFFormElement>}
            </div>
            <div className="flex flex-wrap -m-4">
                {schoolProgramsBlock?.schoolPrograms?.slice(0, 3).map(({hero, _id}) => {
                    return (<div key={_id.toString()} className="sm:w-1/2 px-4">
                        <LFFormElement labelValue="Program Tagline" labelName={`programTagline${_id.toString()}`}>
                            <TextInput id={`programTagline${_id.toString()}`} type="text"
                                       placeholder="Program Tagline"
                                       value={hero.tagline} required
                                       onChange={(event) => setSchoolProgramHeroTagline(_id, event.currentTarget.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Program Headline" labelName={`programHeadline${_id.toString()}`}>
                            <TextInput id={`programHeadline${_id.toString()}`} type="text"
                                       placeholder="Program Headline"
                                       value={hero.headline} required
                                       onChange={(event) => setSchoolProgramHeroHeadline(_id, event.currentTarget.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Program Text" labelName={`programText${_id.toString()}`}>
                            <Textarea id={`programText${_id.toString()}`} placeholder="Program Text"
                                      className='h-text-area'
                                      value={hero.text} required
                                      onChange={(event) => setSchoolProgramHeroText(_id, event.currentTarget.value)}/>
                        </LFFormElement>
                        <ImageBlock imagePath={hero.image?.src}/>
                    </div>)
                })}
            </div>
        </div>
    </section>
    /*return
        <LFFormSection sectionTitle='School Programs'>
            {schoolProgramsBlock?.heading &&
                <LFFormElement labelValue="School Programs Heading" labelName='schoolProgramsHeading'>
                    <TextInput id="schoolProgramsHeading" type="text" placeholder="School Programs Heading"
                               value={schoolProgramsBlock?.heading} required onChange={(event) => {
                        setSchoolProgramsHeading(event.currentTarget.value)
                    }}/>
                </LFFormElement>}
            {/!*School Programs*!/}
            {schoolProgramsBlock?.schoolPrograms?.slice(0, 3).map(({hero, _id}) => {
                return (<div key={_id.toString()} className="sm:w-1/2 px-4">
                    <LFFormElement labelValue="Program Tagline" labelName={`programTagline${_id.toString()}`}>
                        <TextInput id={`programTagline${_id.toString()}`} type="text" placeholder="Program Tagline"
                                   value={hero.tagline} required
                                   onChange={(event) => setSchoolProgramHeroTagline(_id, event.currentTarget.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Program Headline" labelName={`programHeadline${_id.toString()}`}>
                        <TextInput id={`programHeadline${_id.toString()}`} type="text"
                                   placeholder="Program Headline"
                                   value={hero.headline} required
                                   onChange={(event) => setSchoolProgramHeroHeadline(_id, event.currentTarget.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Program Text" labelName={`programText${_id.toString()}`}>
                        <TextInput id={`programText${_id.toString()}`} type="text" placeholder="Program Text"
                                   value={hero.text} required
                                   onChange={(event) => setSchoolProgramHeroText(_id, event.currentTarget.value)}/>
                    </LFFormElement>
                    <ImageBlock imagePath={hero.image?.src}/>
                </div>)
            })}
        </LFFormSection>*/
}
export default SchoolPrograms;