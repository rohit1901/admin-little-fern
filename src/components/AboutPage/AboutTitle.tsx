'use client'
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {useAboutPageStore} from "@admin/store/useAboutPageStore";

const AboutTitle = () => {
    const {
        aboutPageData: {title, description, subTitle, paragraph},
        setDescription,
        setSubTitle,
        setTitle,
        setParagraph
    } = useAboutPageStore()
    return <LFFormSection sectionTitle={'About Page'}>
        <div className="lg:flex-grow md:w-1/2 pr-4">
            <LFFormElement labelValue='Title' labelName="tagline" elemValue={title}>
                <TextInput id="tagline" type="text" placeholder="Tagline for the Hero Block"
                           value={title} required onChange={(event) => setTitle(event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue='Sub-title' labelName='subTitle' elemValue={subTitle}>
                <TextInput id="subTitle" placeholder="Sub-title for the Hero Block"
                           value={subTitle} required onChange={(event) => setSubTitle(event.target.value)}/>
            </LFFormElement>
        </div>
        <div className="lg:flex-grow md:w-1/2">
            <LFFormElement labelValue='Paragraph' labelName='paragraph' elemValue={paragraph}>
                <Textarea id="paragraph" placeholder="Paragraph for the About Page" className='h-text-area'
                          value={paragraph} required onChange={(event) => setParagraph(event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue='Description' labelName='description' elemValue={description}>
                <Textarea id="description" placeholder="Description for the About Page" className='h-text-area'
                          value={description} required onChange={(event) => setDescription(event.target.value)}/>
            </LFFormElement>
        </div>
    </LFFormSection>
}
export default AboutTitle;