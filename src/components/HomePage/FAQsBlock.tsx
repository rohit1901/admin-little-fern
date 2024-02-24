import {FAQBlock} from "@admin/types";
import {Fragment} from "react";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";

type FAQsBlockProps = {
    faqBlock: FAQBlock
}
const FAQsBlock = ({faqBlock}: FAQsBlockProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'FAQ Block - Heading'}>
            <LFFormElement labelValue="FAQ Heading" labelName='faqHeading'>
                <TextInput id="faqHeading" type="text" placeholder="FAQ Heading"
                           value={faqBlock.heading} required onChange={(event) => {
                    // update the name
                }}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'FAQ Block - FAQs'}>
            {faqBlock.faqs?.map((faq) => {
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
    </Fragment>
}
export default FAQsBlock;