import {TextBlock} from '@admin/types'
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import {TextInput} from "flowbite-react";
import LFFormElement from "@admin/components/LFFormElement";

type TextBlockProps = {
    textBlock: TextBlock
}
const TextBlock = ({textBlock}: TextBlockProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'Text Block'}>
            <LFFormElement labelValue='Headline' labelName='text-block-headline'>
                <TextInput id="text-block-headline" placeholder="Headline for the Hero Block"
                           value={textBlock.headline} required onChange={(event) => {
                    // update the title
                }}/>
            </LFFormElement>
            <LFFormElement labelValue='Text' labelName='text-block-text'>
                <TextInput id="text-block-text" placeholder="Text for the Text Block"
                           value={textBlock.text} required onChange={(event) => {
                    // update the description
                }}/>
            </LFFormElement>
        </LFFormSection>
    </Fragment>
}
export default TextBlock