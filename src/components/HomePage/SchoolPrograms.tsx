'use client'
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useHomePageStore, useSchoolProgramsPageStore} from "@admin/store";
import {ImageBlock} from "@admin/components/ImageBlock";

const headingClasses = "container mx-auto flex px-5 md:flex-row flex-col items-center w-full " +
    "text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl"
const SchoolPrograms = () => {
    const {
        setSchoolProgramsHeading,
        setSchoolProgramHeroHeadline,
        setSchoolProgramHeroTagline,
        setSchoolProgramHeroText
    } = useHomePageStore(state => state)
    const {programs, heading} = useSchoolProgramsPageStore()
    return <section className="text-gray-600 body-font">
        <div className="pt-20">
            <h1 className={headingClasses}>
                <span
                    className="text-transparent bg-clip-text bg-cyan-800 dark:text-cyan-200">School Programs</span>
            </h1>
        </div>
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col w-1/2 mb-20">
                <LFFormElement labelValue="School Programs Heading" labelName='schoolProgramsHeading'
                               elemValue={heading}>
                    <Textarea id="schoolProgramsHeading" placeholder="School Programs Heading"
                              className='h-text-area'
                              value={heading} required onChange={(event) => {
                        setSchoolProgramsHeading(event.currentTarget.value)
                    }}/>
                </LFFormElement>
            </div>
            <div className="flex flex-wrap -m-4">
                {programs?.slice(0, 3).map(({hero, _id}) => {
                    return (<div key={_id.toString()} className="sm:w-1/2 px-4">
                        <LFFormElement labelValue="Program Tagline" labelName={`programTagline${_id.toString()}`}
                                       elemValue={hero.tagline}>
                            <TextInput id={`programTagline${_id.toString()}`} type="text"
                                       placeholder="Program Tagline"
                                       value={hero.tagline} required
                                       onChange={(event) => setSchoolProgramHeroTagline(_id, event.currentTarget.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Program Headline" labelName={`programHeadline${_id.toString()}`}
                                       elemValue={hero.headline}>
                            <TextInput id={`programHeadline${_id.toString()}`} type="text"
                                       placeholder="Program Headline"
                                       value={hero.headline} required
                                       onChange={(event) => setSchoolProgramHeroHeadline(_id, event.currentTarget.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Program Text" labelName={`programText${_id.toString()}`}
                                       elemValue={hero.text}>
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
}
export default SchoolPrograms;