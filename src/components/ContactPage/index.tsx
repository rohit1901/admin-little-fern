'use client'
import {ContactPageData} from "@admin/types";
import LFForm from "@admin/components/LFForm";
import LFFormElement from "@admin/components/LFFormElement";
import {Textarea, TextInput} from "flowbite-react";
import LFFormSection from "@admin/components/LFFormSection";
import {useContactPageStore} from "@admin/store/";
import {useEffect} from "react";
import {isContactPageData} from "@admin/lib";
import {WithId} from "mongodb";

type ContactPageProps = {
    pageData: WithId<ContactPageData>
}
const MapsIframe = () => {
    return (
        <iframe loading="lazy" width="100%" height="100%"
                className="absolute inset-0 grayscale opacity-20" title="map"
            //eslint-disable-next-line
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Little%2BFern%2BPre%2BSchool%2BAnd%2BDay%2BBoarding+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed">
        </iframe>
    )
}
const ContactPageComponent = ({pageData}: ContactPageProps) => {
    const {
        contactPageData,
        setContactPageData,
        setHeroTagline,
        setHeroHeadline,
        setHeroText,
        setContactInformationAddress,
        setContactInformationPhone,
        setContactInformationEmail,
        setTextBlockHeadline,
        setTextBlockText
    } = useContactPageStore()
    useEffect(() => {
        setContactPageData(pageData)
    }, [])
    return (
        <div className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <LFForm data={contactPageData} updateState={(data) => {
                if (!isContactPageData(data)) return
                setContactPageData(data)
            }}>
                <LFFormSection sectionTitle={'Contact Page'} alwaysOpen>
                    {/* Map */}
                    <div
                        className="lg:w-2/3 md:w-2/3 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <MapsIframe/>
                        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md dark:bg-gray-800">
                            <div className="lg:w-1/2 px-6">
                                <LFFormElement labelValue="Address" labelName="contact-address"
                                               elemValue={contactPageData?.contactInformation?.address}>
                                    <Textarea id="contact-address" placeholder="Address"
                                              value={contactPageData?.contactInformation?.address} required className="h-text-area"
                                              onChange={(event) => setContactInformationAddress(event.target.value)}/>
                                </LFFormElement>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <LFFormElement labelValue="Phone" labelName="contact-phone"
                                               elemValue={contactPageData?.contactInformation?.phone}>
                                    <TextInput id="contact-phone" placeholder="Phone"
                                               value={contactPageData?.contactInformation?.phone} required
                                               onChange={(event) => setContactInformationPhone(event.target.value)}/>
                                </LFFormElement>
                                <LFFormElement labelValue="Email" labelName="contact-email"
                                               elemValue={contactPageData?.contactInformation?.email}>
                                    <TextInput id="contact-email" placeholder="Email"
                                               value={contactPageData?.contactInformation?.email} required
                                               onChange={(event) => setContactInformationEmail(event.target.value)}/>
                                </LFFormElement>
                            </div>
                        </div>
                    </div>
                    {/* Properties */}
                    <div
                        className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 dark:bg-gray-800">
                        <LFFormElement labelValue="Tagline" labelName="contact-hero-tagline"
                                       elemValue={contactPageData?.contactInformation?.hero?.tagline}>
                            <TextInput id="contact-hero-tagline" placeholder="Tagline for the Hero Block"
                                       value={contactPageData?.contactInformation?.hero?.tagline} required
                                       onChange={(event) => setHeroTagline(event.target.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Headline" labelName="contact-hero-headline"
                                       elemValue={contactPageData?.contactInformation?.hero?.headline}>
                            <TextInput id="contact-hero-headline" placeholder="Headline for the Hero Block"
                                       value={contactPageData?.contactInformation?.hero?.headline} required
                                       onChange={(event) => setHeroHeadline(event.target.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Text" labelName="contact-hero-text"
                                       elemValue={contactPageData?.contactInformation?.hero?.text}>
                            <Textarea id="contact-hero-text" placeholder="Text for the Hero Block"
                                      className="h-text-area"
                                      value={contactPageData?.contactInformation?.hero?.text} required
                                      onChange={(event) => setHeroText(event.target.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Title" labelName="contact-events-title"
                                       elemValue={contactPageData?.textBlock?.headline}>
                            <TextInput id="contact-events-title" placeholder="Title"
                                       value={contactPageData?.textBlock?.headline} required
                                       onChange={(event) => setTextBlockHeadline(event.target.value)}/>
                        </LFFormElement>
                        <LFFormElement labelValue="Description" labelName="contact-events-description"
                                       elemValue={contactPageData?.textBlock?.text}>
                            <Textarea id="contact-events-description" placeholder="Description"
                                      value={contactPageData?.textBlock?.text} required className="h-text-area"
                                      onChange={(event) => setTextBlockText(event.target.value)}/>
                        </LFFormElement>
                    </div>
                </LFFormSection>
            </LFForm>
        </div>
    );
}
export default ContactPageComponent