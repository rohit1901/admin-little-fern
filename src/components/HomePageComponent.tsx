'use client'
import {Button, Label, Textarea, TextInput} from "flowbite-react";
import {Hero, HomeHeroBlock, HomePageData} from "@admin/types";
import {useState} from "react";
import Dropzone from "@admin/components/Dropzone";

type HomePageDataProps = {
    homePageData: HomePageData
}
const HomePageComponent = ({homePageData}: HomePageDataProps) => {
    const [homeData, setHomeData] = useState<HomePageData>(homePageData)
    const onChange = (updatedData: HomePageData) => {
        setHomeData(updatedData)
    }
    return (
        <div className='p-4 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <form className="flex max-w-md flex-col gap-4">
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
                                  const hero: Hero = {...homeData.homeHero.hero, text: event.currentTarget.value}
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
                <div className="flex flex-wrap gap-2">
                    <Button className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'
                            type="submit">Reset</Button>
                    <Button className='dark:bg-primary-50 dark:text-primary-900 bg-primary-900 text-primary-50'
                            type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}
export default HomePageComponent