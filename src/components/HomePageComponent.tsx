'use client'
import {Button, Checkbox, Label, Textarea, TextInput} from "flowbite-react";
import {Hero, HomeHeroBlock, HomePageData, SchoolFeatures} from "@admin/types";
import {Fragment, useState} from "react";
import Dropzone from "@admin/components/Dropzone";
import LFForm from "@admin/components/LFForm";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";

type HomePageDataProps = {
    homePageData: HomePageData
}
const HomePageComponent = ({homePageData}: HomePageDataProps) => {
    const [homeData, setHomeData] = useState<HomePageData>(homePageData)
    const onChange = (updatedData: HomePageData) => {
        setHomeData(updatedData)
    }

    const stringToArray = (string: string) => {
        return string.split(',').map((item) => item.trim())
    }
    return (<div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <LFForm>
                {/* Hero Block */}
                <LFFormSection sectionTitle='Hero Block'>
                    <LFFormElement labelValue='Tagline' labelName='tagline'>
                        <TextInput id="tagline" type="text" placeholder="Tagline for the Hero Block"
                                   value={homeData.homeHero.hero?.tagline} required onChange={(event) => {
                            const hero: Hero = {...homeData.homeHero.hero, tagline: event.currentTarget.value}
                            const homeHero: HomeHeroBlock = {...homeData.homeHero, hero}
                            const updatedData: HomePageData = {...homeData, homeHero}
                            onChange(updatedData)
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Headline" labelName="headline">
                        <TextInput id="headline" type="text" placeholder="Headline for the Hero Block"
                                   value={homeData.homeHero.hero?.headline} required onChange={(event) => {
                            const hero: Hero = {...homeData.homeHero.hero, headline: event.currentTarget.value}
                            const homeHero: HomeHeroBlock = {...homeData.homeHero, hero}
                            const updatedData: HomePageData = {...homeData, homeHero}
                            onChange(updatedData)
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Text" labelName="text">
                        <Textarea id="text" placeholder="Text for the Hero Block"
                                  value={homeData.homeHero.hero?.text} required className='h-text-area'
                                  onChange={(event) => {
                                      const hero: Hero = {
                                          ...homeData.homeHero.hero,
                                          text: event.currentTarget.value
                                      }
                                      const homeHero: HomeHeroBlock = {...homeData.homeHero, hero}
                                      const updatedData: HomePageData = {...homeData, homeHero}
                                      onChange(updatedData)
                                  }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="YouTube Video Link" labelName="youtube">
                        <TextInput id="youtube" placeholder="YouTube Video Link"
                                   value={homeData.homeHero.hero?.youTubeLink} required onChange={(event) => {
                            const hero: Hero = {...homeData.homeHero.hero, youTubeLink: event.currentTarget.value}
                            const homeHero: HomeHeroBlock = {...homeData.homeHero, hero}
                            const updatedData: HomePageData = {...homeData, homeHero}
                            onChange(updatedData)
                        }}/>
                    </LFFormElement>
                    <Dropzone imagePath={homeData.homeHero.hero?.image?.src} withPopover/>
                </LFFormSection>
                {/* School Features heading, subheading, text */}
                <LFFormSection sectionTitle='School Features'>
                    <LFFormElement labelValue="School features heading" labelName="sfh">
                        <TextInput id="sfh" type="text" placeholder="School features heading"
                                   value={homeData.schoolFeatures.heading} required onChange={(event) => {
                            const schoolFeatures: SchoolFeatures = {
                                ...homeData.schoolFeatures, heading: event.currentTarget.value
                            }
                            const updatedData: HomePageData = {...homeData, schoolFeatures}
                            onChange(updatedData)
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="School features sub-heading" labelName="sfsh">
                        <TextInput id="sfsh" type="text" placeholder="School features  sub-heading"
                                   value={homeData.schoolFeatures.subHeading} required onChange={(event) => {
                            const schoolFeatures: SchoolFeatures = {
                                ...homeData.schoolFeatures, subHeading: event.currentTarget.value
                            }
                            const updatedData: HomePageData = {...homeData, schoolFeatures}
                            onChange(updatedData)
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="School features text" labelName="sff">
                        <TextInput id="sff" type="text" placeholder="School features text"
                                   value={homeData.schoolFeatures.features?.toString()} required
                                   onChange={(event) => {
                                       const schoolFeatures: SchoolFeatures = {
                                           ...homeData.schoolFeatures,
                                           features: stringToArray(event.currentTarget.value)
                                       }
                                       const updatedData: HomePageData = {...homeData, schoolFeatures}
                                       onChange(updatedData)
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="School features" labelName="sff">
                        <TextInput id="sff" type="text" placeholder="School features"
                                   value={homeData.schoolFeatures.features?.toString()} required
                                   onChange={(event) => {
                                       const schoolFeatures: SchoolFeatures = {
                                           ...homeData.schoolFeatures,
                                           features: stringToArray(event.currentTarget.value)
                                       }
                                       const updatedData: HomePageData = {...homeData, schoolFeatures}
                                       onChange(updatedData)
                                   }}/>
                    </LFFormElement>
                </LFFormSection>
                {/* School Features items */}
                <LFFormSection sectionTitle='School Features Block'>
                    {homeData.schoolFeatures.featureBlocks?.map(block => {
                        return (<Fragment key={block.headline}>
                                <LFFormElement labelValue="School Feature Headline" labelName='schoolFeatureHeadline'>
                                    <TextInput id="sffbh" type="text"
                                               placeholder="School features block headline"
                                               value={block.headline} required onChange={(event) => {
                                        // update the block headline
                                    }}/>
                                </LFFormElement>
                                <LFFormElement labelValue="School feature tagline" labelName='sffbt'>
                                    <TextInput id="sffbt" type="text"
                                               placeholder="School features features block tagline"
                                               value={block.tagline} required onChange={(event) => {
                                        // update the block headline
                                    }}/>
                                </LFFormElement>
                                <LFFormElement labelValue="School feature text" labelName='sffbtx'>
                                    <TextInput id="sffbtx" type="text"
                                               placeholder="School features features block text"
                                               value={block.text} required onChange={(event) => {
                                        // update the block headline
                                    }}/>
                                </LFFormElement>
                                <Dropzone imagePath={block.portraitImage?.src} withPopover/>
                                <Dropzone imagePath={block.squareImage?.src} withPopover/>
                            </Fragment>
                        )
                    })}
                </LFFormSection>
                {/* Featured Staff block */}
                <LFFormSection sectionTitle='Featured Staff Block'>
                    {homeData.staff.featuredStaffDescription?.map(({name, description}) => {
                        return (
                            <Fragment key={name}>
                                <LFFormElement labelValue="Featured staff name" labelName='featuredStaffName'>
                                    <TextInput id="featuredStaffName" type="text"
                                               placeholder="Featured staff name"
                                               value={name} required onChange={(event) => {
                                        // update the name
                                    }}/>
                                </LFFormElement>
                                <LFFormElement labelValue="Featured staff description"
                                               labelName='featuredStaffDescription'>
                                    <TextInput id="featuredStaffDescription" type="text"
                                               placeholder="Featured staff description"
                                               value={description} required onChange={(event) => {
                                        // update the name
                                    }}/>
                                </LFFormElement>
                            </Fragment>
                        )
                    })}
                </LFFormSection>
                {/*Staff Details*/}
                <LFFormSection sectionTitle='Staff Details'>
                    {homeData.staff.staffDetails?.map(({
                                                           name,
                                                           portraitImage,
                                                           image,
                                                           role
                                                       }) => {
                        return (
                            <Fragment key={`staff-details-${name}`}>
                                <LFFormElement labelValue="Staff name" labelName='staffName'>
                                    <TextInput id="staffName" type="text" placeholder="Staff name"
                                               value={name} required onChange={(event) => {
                                        // update the name
                                    }}/>
                                </LFFormElement>
                                <LFFormElement labelValue="Staff role" labelName='staffRole'>
                                    <TextInput id="staffRole" type="text" placeholder="Staff role"
                                               value={role} required onChange={(event) => {
                                        // update the name
                                    }}/>
                                </LFFormElement>
                                <Dropzone imagePath={portraitImage} withPopover/>
                                <Dropzone imagePath={image} withPopover/>
                            </Fragment>
                        )
                    })}
                </LFFormSection>
                {/*Staff Assurances Block */}
                <LFFormSection sectionTitle='Staff Assurances'>
                    <LFFormElement labelValue="Staff Assurances Block Heading" labelName='staffAssurancesBlockHeading'>
                        <TextInput id="staffAssurancesBlockHeading" type="text"
                                   placeholder="Staff Assurances Block Heading"
                                   value={homeData.staff.assurancesBlock?.heading} required
                                   onChange={(event) => {
                                       // update the name
                                   }}/>
                    </LFFormElement>
                    {homeData.staff.assurancesBlock?.assurances?.map((assurance) => {
                        return (<Fragment key={assurance}>
                            <LFFormElement labelValue="Staff Assurance" labelName='staffAssuranceText'>
                                <TextInput id="staffAssuranceText" type="text" placeholder="Staff Assurance"
                                           value={assurance} required onChange={(event) => {
                                    // update the name
                                }}/>
                            </LFFormElement>
                        </Fragment>)
                    })}
                </LFFormSection>
                {/*School Programs heading, sub-heading*/}
                <LFFormSection sectionTitle='School Programs'>
                    <LFFormElement labelValue="School Programs Heading" labelName='schoolProgramsHeading'>
                        <TextInput id="schoolProgramsHeading" type="text" placeholder="School Programs Heading"
                                   value={homeData.schoolProgramsBlock.heading} required onChange={(event) => {
                            // update the name
                        }}/>
                    </LFFormElement>
                    {/*School Programs*/}
                    {homeData.schoolProgramsBlock.schoolPrograms?.slice(0, 3).map(({hero}) => {
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
                {/*Testimonials*/}
                <LFFormSection sectionTitle={'Testimonials'}>
                    <LFFormElement labelValue="Testimonial Heading" labelName='testimonialHeading'>
                        <TextInput id="testimonialHeading" type="text" placeholder="Testimonial Heading"
                                   value={homeData.testimonialsBlock.heading} required onChange={(event) => {
                            // update the name
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Testimonial Sub-Heading" labelName='testimonialSubHeading'>
                        <TextInput id="testimonialSubHeading" type="text" placeholder="Testimonial Sub-Heading"
                                   value={homeData.testimonialsBlock.subHeading} required onChange={(event) => {
                            // update the name
                        }}/>
                    </LFFormElement>
                </LFFormSection>
                {/*FAQ Block*/}
                <LFFormSection sectionTitle={'FAQ Block - Heading'}>
                    <LFFormElement labelValue="FAQ Heading" labelName='faqHeading'>
                        <TextInput id="faqHeading" type="text" placeholder="FAQ Heading"
                                   value={homeData.faqBlock.heading} required onChange={(event) => {
                            // update the name
                        }}/>
                    </LFFormElement>
                </LFFormSection>
                <LFFormSection sectionTitle={'FAQ Block - FAQs'}>
                    {homeData.faqBlock.faqs?.map((faq) => {
                        return (<Fragment key={faq.question}>
                            <LFFormElement labelValue="FAQ Question" labelName='faqQuestion'>
                                <TextInput id="faqQuestion" type="text" placeholder="FAQ Question"
                                           value={faq.question} required onChange={(event) => {
                                    // update the name
                                }}/>
                            </LFFormElement>
                            <LFFormElement labelValue="FAQ Answer" labelName='faqAnswer'>
                                <Textarea id="faqAnswer" placeholder="FAQ Answer"
                                          value={faq.answer} required onChange={(event) => {
                                    // update the name
                                }}/>
                            </LFFormElement>
                        </Fragment>)
                    })}
                </LFFormSection>
            </LFForm>
            <div className="flex items-center gap-2 pt-2 pb-2">
                <Checkbox id="ratings" defaultChecked/>
                <Label htmlFor="ratings" className="flex">
                    Show ratings from Google Maps on the website
                </Label>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                <Button className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'
                        type="submit">Reset</Button>
                <Button className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'
                        type="submit">Submit</Button>
            </div>
        </div>
    )
}
export default HomePageComponent