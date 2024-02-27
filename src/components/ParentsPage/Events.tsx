'use client'
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Fragment} from "react";
import Dropzone from "@admin/components/Dropzone";
import {TextInput} from "flowbite-react";
import {useParentsPageStore} from "@admin/store/useParentsPageStore";

const ParentsEvents = () => {
    const {
        parentsPageData,
        setEventDates,
        setEventDescription,
        setEventName,
        setEventsHeadline,
        setEventsText
    } = useParentsPageStore()
    return <Fragment>
        <LFFormSection sectionTitle={'Parents Events Text'}>
            <LFFormElement labelValue="Title" labelName="parents-events-title">
                <TextInput id="parents-events-title" placeholder="Title" value={parentsPageData?.eventsText?.headline}
                           required
                           onChange={(event) => setEventsHeadline(event.target.value)}/>
            </LFFormElement>
            <LFFormElement labelValue="Description" labelName="parents-events-description">
                <TextInput id="parents-events-description" placeholder="Description"
                           value={parentsPageData?.eventsText?.text} required
                           onChange={(event) => setEventsText(event.target.value)}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'Parents Events'}>
            {parentsPageData?.events?.map((event, index) => {
                return <Fragment key={event._id.toString()}>
                    <LFFormElement labelValue="Name" labelName="parents-event-name">
                        <TextInput id="parents-event-name" placeholder="Event Name" value={event?.name} required
                                   onChange={(e) => setEventName(event._id.toString(), e.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Description" labelName="parents-event-description">
                        <TextInput id="parents-event-description" placeholder="Event Description"
                                   value={event?.description} required
                                   onChange={(e) => setEventDescription(event._id.toString(), e.target.value)}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Dates" labelName="parents-event-dates">
                        <TextInput id="parents-event-dates" placeholder="Event Dates" value={event?.dates} required
                                   onChange={(e) => setEventDates(event._id.toString(), e.target.value)}/>
                    </LFFormElement>
                    <Dropzone imagePath={event?.image} withPopover/>
                </Fragment>
            })}
        </LFFormSection>
    </Fragment>
}
export default ParentsEvents