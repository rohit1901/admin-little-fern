'use client'
import {ContactPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import LFFormElement from "@admin/components/LFFormElement";
import {TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";

type ContactPageProps = {
    contactPageData: ContactPageData
}
const ContactPageComponent = ({contactPageData}: ContactPageProps) => {
    return (
        <div className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
            <LFForm>
                <LFFormSection sectionTitle={'Contact Page Text'}>
                    {/* Hero properties */}
                    <LFFormElement labelValue="Title" labelName="contact-events-title">
                        <TextInput id="contact-events-title" placeholder="Title"
                                   value={contactPageData.textBlock?.headline} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Description" labelName="contact-events-description">
                        <TextInput id="contact-events-description" placeholder="Description"
                                   value={contactPageData.textBlock?.text} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Address" labelName="contact-address">
                        <TextInput id="contact-address" placeholder="Address"
                                   value={contactPageData.contactInformation?.address} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Phone" labelName="contact-phone">
                        <TextInput id="contact-phone" placeholder="Phone"
                                   value={contactPageData.contactInformation?.phone} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Email" labelName="contact-email">
                        <TextInput id="contact-email" placeholder="Email"
                                   value={contactPageData.contactInformation?.email} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Tagline" labelName="contact-hero-tagline">
                        <TextInput id="contact-hero-tagline" placeholder="Tagline for the Hero Block"
                                   value={contactPageData.contactInformation.hero?.tagline} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Headline" labelName="contact-hero-headline">
                        <TextInput id="contact-hero-headline" placeholder="Headline for the Hero Block"
                                   value={contactPageData.contactInformation.hero?.headline} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Text" labelName="contact-hero-text">
                        <TextInput id="contact-hero-text" placeholder="Text for the Hero Block" className="h-text-area"
                                   value={contactPageData.contactInformation.hero?.text} required onChange={(event) => {
                            // update the description
                        }}/>
                    </LFFormElement>
                </LFFormSection>
            </LFForm>
        </div>
    );
}
export default ContactPageComponent