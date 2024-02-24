'use client'
import {Button, Checkbox, Label, Textarea, TextInput} from "flowbite-react";
import {Hero, HomeHeroBlock, HomePageData, SchoolFeatures} from "@admin/types";
import {Fragment, useState} from "react";
import Dropzone from "@admin/components/Dropzone";

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
            <form className='divide-y-2 divide-dashed divide-purple-800'>
                {/* Hero Block */}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Hero Block</span> -
                        Home Page</h1>
                    <section className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tagline" value="Tagline"/>
                            </div>
                            <TextInput id="tagline" type="text" placeholder="Tagline for the Hero Block"
                                       value={homeData.homeHero.hero?.tagline} required onChange={(event) => {
                                const hero: Hero = {...homeData.homeHero.hero, tagline: event.currentTarget.value}
                                const homeHero: HomeHeroBlock = {...homeData.homeHero, hero}
                                const updatedData: HomePageData = {...homeData, homeHero}
                                onChange(updatedData)
                            }}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="headline" value="Headline"/>
                            </div>
                            <TextInput id="headline" type="text" placeholder="Headline for the Hero Block"
                                       value={homeData.homeHero.hero?.headline} required onChange={(event) => {
                                const hero: Hero = {...homeData.homeHero.hero, headline: event.currentTarget.value}
                                const homeHero: HomeHeroBlock = {...homeData.homeHero, hero}
                                const updatedData: HomePageData = {...homeData, homeHero}
                                onChange(updatedData)
                            }}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="text" value="Text"/>
                            </div>
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
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="youtube" value="YouTube Video Link"/>
                            </div>
                            <TextInput id="youtube" placeholder="YouTube Video Link"
                                       value={homeData.homeHero.hero?.youTubeLink} required onChange={(event) => {
                                const hero: Hero = {...homeData.homeHero.hero, youTubeLink: event.currentTarget.value}
                                const homeHero: HomeHeroBlock = {...homeData.homeHero, hero}
                                const updatedData: HomePageData = {...homeData, homeHero}
                                onChange(updatedData)
                            }}/>
                        </div>
                        <Dropzone imagePath={homeData.homeHero.hero?.image?.src} withPopover/>
                    </section>
                </div>
                {/* School Features heading, subheading, text */}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">School Features Block</span> -
                        Heading, subheading, text</h1>
                    <section className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="sfh" value="School features heading"/>
                            </div>
                            <TextInput id="sfh" type="text" placeholder="School features heading"
                                       value={homeData.schoolFeatures.heading} required onChange={(event) => {
                                const schoolFeatures: SchoolFeatures = {
                                    ...homeData.schoolFeatures, heading: event.currentTarget.value
                                }
                                const updatedData: HomePageData = {...homeData, schoolFeatures}
                                onChange(updatedData)
                            }}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="sfsh" value="School features sub-heading"/>
                            </div>
                            <TextInput id="sfsh" type="text" placeholder="School features  sub-heading"
                                       value={homeData.schoolFeatures.subHeading} required onChange={(event) => {
                                const schoolFeatures: SchoolFeatures = {
                                    ...homeData.schoolFeatures, subHeading: event.currentTarget.value
                                }
                                const updatedData: HomePageData = {...homeData, schoolFeatures}
                                onChange(updatedData)
                            }}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="sff" value="School features text"/>
                            </div>
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
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="sff" value="School features"/>
                            </div>
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
                        </div>
                    </section>
                </div>
                {/* School Features items */}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">School Features Block</span>
                    </h1>
                    <section className="grid grid-cols-2 gap-4">
                        {homeData.schoolFeatures.featureBlocks?.map(block => {
                            return (<Fragment key={block.headline}>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="sffbh" value="School features features block headline"/>
                                        <TextInput id="sffbh" type="text"
                                                   placeholder="School features features block headline"
                                                   value={block.headline} required onChange={(event) => {
                                            // update the block headline
                                        }}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="sffbt" value="School features features block tagline"/>
                                        <TextInput id="sffbt" type="text"
                                                   placeholder="School features features block tagline"
                                                   value={block.tagline} required onChange={(event) => {
                                            // update the block headline
                                        }}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="sffbtx" value="School features features block text"/>
                                        <TextInput id="sffbtx" type="text"
                                                   placeholder="School features features block text"
                                                   value={block.text} required onChange={(event) => {
                                            // update the block headline
                                        }}/>
                                    </div>
                                </div>
                                <Dropzone imagePath={block.portraitImage?.src} withPopover/>
                                <Dropzone imagePath={block.squareImage?.src} withPopover/>
                            </Fragment>)
                        })}
                    </section>
                </div>
                {/* Featured Staff block */}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Featured Staff Block</span> -
                        Home Page</h1>
                    {homeData.staff.featuredStaffDescription?.map(({name, description}) => {
                        return (
                            <section className="grid grid-cols-2 gap-4" key={`featured-staff-description-${name}`}>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="featuredStaffName" value="Featured staff name"/>
                                        <TextInput id="featuredStaffName" type="text" placeholder="Featured staff name"
                                                   value={name} required onChange={(event) => {
                                            // update the name
                                        }}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="featuredStaffDescription" value="Featured staff description"/>
                                        <TextInput id="featuredStaffDescription" type="text"
                                                   placeholder="Featured staff description"
                                                   value={description} required onChange={(event) => {
                                            // update the name
                                        }}/>
                                    </div>
                                </div>
                            </section>)
                    })}
                </div>
                {/*Staff Details*/}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Featured Staff Details</span> -
                        Home Page</h1>
                    {homeData.staff.staffDetails?.filter(s => s.featured).map(({name, portraitImage, image, role}) => {
                        return (
                            <section className="grid grid-cols-2 gap-4" key={`featured-staff-details-${name}`}>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="staffName" value="Staff name"/>
                                        <TextInput id="staffName" type="text" placeholder="Staff name"
                                                   value={name} required onChange={(event) => {
                                            // update the name
                                        }}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="staffRole" value="Staff role"/>
                                        <TextInput id="staffRole" type="text" placeholder="Staff role"
                                                   value={role} required onChange={(event) => {
                                            // update the name
                                        }}/>
                                    </div>
                                </div>
                                <Dropzone imagePath={portraitImage} withPopover/>
                                <Dropzone imagePath={image} withPopover/>
                            </section>
                        )
                    })}
                </div>
                {/*Staff Assurances Block */}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Staff Assurances</span> -
                        Home Page</h1>
                    <section className="grid grid-cols-2 gap-4">
                        <div className="mb-2 block">
                            <Label htmlFor="staffAssurancesBlockHeading" value="Staff Assurances Block Heading"/>
                            <TextInput id="staffAssurancesBlockHeading" type="text"
                                       placeholder="Staff Assurances Block Heading"
                                       value={homeData.staff.assurancesBlock?.heading} required onChange={(event) => {
                                // update the name
                            }}/>
                        </div>
                        {/*Staff Assurances*/}
                        {homeData.staff.assurancesBlock?.assurances?.map((assurance) => {
                            return (<div key={assurance}>
                                <div className="mb-2 block">
                                    <Label htmlFor="staffAssuranceText" value="Staff Assurance"/>
                                    <TextInput id="staffAssuranceText" type="text" placeholder="Staff Assurance"
                                               value={assurance} required onChange={(event) => {
                                        // update the name
                                    }}/>
                                </div>
                            </div>)
                        })}
                    </section>
                </div>
                {/*School Programs heading, sub-heading*/}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">School Programs Block</span> -
                        Home Page</h1>
                    <section className="grid grid-cols-2 gap-4">
                        <div className="mb-2 block">
                            <Label htmlFor="schoolProgramsHeading" value="School Programs Heading"/>
                            <TextInput id="schoolProgramsHeading" type="text" placeholder="School Programs Heading"
                                       value={homeData.schoolProgramsBlock.heading} required onChange={(event) => {
                                // update the name
                            }}/>
                        </div>
                        {/*School Programs*/}
                        {homeData.schoolProgramsBlock.schoolPrograms?.slice(0, 3).map(({hero}) => {
                            return (<Fragment key={hero.tagline}>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="programTagline" value="Program Tagline"/>
                                        <TextInput id="programTagline" type="text" placeholder="Program Tagline"
                                                   value={hero.tagline} required onChange={(event) => {
                                            // update the name
                                        }}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="programHeadline" value="Program Headline"/>
                                        <TextInput id="programHeadline" type="text" placeholder="Program Headline"
                                                   value={hero.headline} required onChange={(event) => {
                                            // update the name
                                        }}/>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="programText" value="Program Text"/>
                                        <TextInput id="programText" type="text" placeholder="Program Text"
                                                   value={hero.text} required onChange={(event) => {
                                            // update the name
                                        }}/>
                                    </div>
                                </div>
                                <Dropzone imagePath={hero.image?.src} withPopover/>
                            </Fragment>)
                        })}
                    </section>
                </div>
                {/*Testimonials*/}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Testimonials Block</span> -
                        Home Page</h1>
                    <section className="grid grid-cols-2 gap-4">
                        <div className="mb-2 block">
                            <Label htmlFor="testimonialHeading" value="Testimonial Heading"/>
                            <TextInput id="testimonialHeading" type="text" placeholder="Testimonial Heading"
                                       value={homeData.testimonialsBlock.heading} required onChange={(event) => {
                                // update the name
                            }}/>
                        </div>
                        <div className="mb-2 block">
                            <Label htmlFor="testimonialSubHeading" value="Testimonial Sub-Heading"/>
                            <TextInput id="testimonialSubHeading" type="text" placeholder="Testimonial Sub-Heading"
                                       value={homeData.testimonialsBlock.subHeading} required onChange={(event) => {
                                // update the name
                            }}/>
                        </div>
                    </section>
                </div>
                {/*FAQ Block*/}
                <div className='pt-2 pb-4'>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">FAQ Block</span> -
                        Home Page</h1>
                    <div className="mb-2 block">
                        <Label htmlFor="faqHeading" value="FAQ Heading"/>
                        <TextInput id="faqHeading" type="text" placeholder="FAQ Heading"
                                   value={homeData.faqBlock.heading} required onChange={(event) => {
                            // update the name
                        }}/>
                    </div>
                    <section className="grid grid-cols-2 gap-4">
                        {homeData.faqBlock.faqs?.map((faq) => {
                            return (<Fragment key={faq.question}>
                                <div className="mb-2 block">
                                    <Label htmlFor="faqQuestion" value="FAQ Question"/>
                                    <TextInput id="faqQuestion" type="text" placeholder="FAQ Question"
                                               value={faq.question} required onChange={(event) => {
                                        // update the name
                                    }}/>
                                </div>
                                <div className="mb-2 block">
                                    <Label htmlFor="faqAnswer" value="FAQ Answer"/>
                                    <Textarea id="faqAnswer" placeholder="FAQ Answer"
                                              value={faq.answer} required onChange={(event) => {
                                        // update the name
                                    }}/>
                                </div>
                            </Fragment>)
                        })}
                    </section>
                </div>
            </form>
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