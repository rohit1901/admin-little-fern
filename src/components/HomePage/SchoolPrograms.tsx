'use client'
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useSchoolProgramsPageStore} from "@admin/store";
import {ImageBlock} from "@admin/components/ImageBlock";
import LFFormSection from "@admin/components/LFFormSection";
import {useEffect} from "react";
import {API_PROGRAMS_GET} from "@admin/lib/constants";

const headingClasses = "container mx-auto flex px-5 md:flex-row flex-col items-center w-full " +
    "text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl"
const SchoolPrograms = () => {
    const {
        programs, heading,
        setHeading, setPrograms, setProgramHeroHeadline, setProgramHeroTagline, setProgramHeroText
    } = useSchoolProgramsPageStore()
    useEffect(() => {
        if (!programs || programs.length === 0) {
            fetch(API_PROGRAMS_GET, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setPrograms(data.body.schoolPrograms)
                    setHeading(data.body.heading)
                }).catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [])
    if (!programs || programs.length === 0) return null
    return <LFFormSection sectionTitle="School Programs">
        <div className="container px-5">
            <div className="flex flex-col w-1/2 mb-20">
                <LFFormElement labelValue="School Programs Heading" labelName='schoolProgramsHeading'
                               elemValue={heading}>
                    <Textarea id="schoolProgramsHeading" placeholder="School Programs Heading"
                              className='h-text-area'
                              value={heading} required onChange={(event) => {
                        setHeading(event.currentTarget.value)
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
                                       onChange={(event) => setProgramHeroTagline(_id.toString(), event.currentTarget.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Program Headline" labelName={`programHeadline${_id.toString()}`}
                                       elemValue={hero.headline}>
                            <TextInput id={`programHeadline${_id.toString()}`} type="text"
                                       placeholder="Program Headline"
                                       value={hero.headline} required
                                       onChange={(event) => setProgramHeroHeadline(_id.toString(), event.currentTarget.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Program Text" labelName={`programText${_id.toString()}`}
                                       elemValue={hero.text}>
                            <Textarea id={`programText${_id.toString()}`} placeholder="Program Text"
                                      className='h-text-area'
                                      value={hero.text} required
                                      onChange={(event) => setProgramHeroText(_id.toString(), event.currentTarget.value)}/>
                        </LFFormElement>
                        <ImageBlock imagePath={hero.image?.src}/>
                    </div>)
                })}
            </div>
        </div>
    </LFFormSection>
}
export default SchoolPrograms;