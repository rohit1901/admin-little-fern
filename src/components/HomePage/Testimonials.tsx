import {Fragment} from "react";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {TestimonialsBlock} from "@admin/types";

type TestimonialsProps = {
    testimonialsBlock: TestimonialsBlock
}
const Testimonials = ({testimonialsBlock}: TestimonialsProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'Testimonials'}>
            <LFFormElement labelValue="Testimonial Heading" labelName='testimonialHeading'
                           elemValue={testimonialsBlock.heading}>
                <TextInput id="testimonialHeading" type="text" placeholder="Testimonial Heading"
                           value={testimonialsBlock.heading} required onChange={(event) => {
                    // update the name
                }}/>
            </LFFormElement>
            <LFFormElement labelValue="Testimonial Sub-Heading" labelName='testimonialSubHeading'
                           elemValue={testimonialsBlock.subHeading}>
                <TextInput id="testimonialSubHeading" type="text" placeholder="Testimonial Sub-Heading"
                           value={testimonialsBlock.subHeading} required onChange={(event) => {
                    // update the name
                }}/>
            </LFFormElement>
        </LFFormSection>
    </Fragment>
}
export default Testimonials;