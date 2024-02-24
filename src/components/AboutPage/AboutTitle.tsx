import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import {Fragment} from "react";

type AboutTitleProps = {
    title?: string,
    subTitle?: string,
    description?: string
}
const AboutTitle = ({title, description, subTitle}: AboutTitleProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'About Page'}>
            <LFFormElement labelValue='Title' labelName='title'>
                <TextInput id="tagline" type="text" placeholder="Tagline for the Hero Block"
                           value={title} required onChange={(event) => {
                    // update the title
                }}/>
            </LFFormElement>
            <LFFormElement labelValue='Sub-title' labelName='subTitle'>
                <TextInput id="subTitle" placeholder="Sub-title for the Hero Block"
                           value={subTitle} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'Description'}>
            <LFFormElement labelValue='Description' labelName='description'>
                <Textarea id="description" placeholder="Description for the About Page" className='h-text-area'
                          value={description} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
        </LFFormSection>
    </Fragment>
}
export default AboutTitle;