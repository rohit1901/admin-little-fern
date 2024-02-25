import {EventItem, TextBlock} from "@admin/types";
import LFFormSection from "@admin/components/LFFormSection";
import LFFormElement from "@admin/components/LFFormElement";
import {Fragment} from "react";
import Dropzone from "@admin/components/Dropzone";
import {TextInput} from "flowbite-react";

type ParentsEventsProps = {
    parentsEvents: EventItem[]
    eventsText: TextBlock
}
const ParentsEvents = ({parentsEvents, eventsText}: ParentsEventsProps) => {
    return <Fragment>
        <LFFormSection sectionTitle={'Parents Events Text'}>
            <LFFormElement labelValue="Title" labelName="parents-events-title">
                <TextInput id="parents-events-title" placeholder="Title" value={eventsText?.headline} required
                           onChange={(event) => {
                               // update the title
                           }}/>
            </LFFormElement>
            <LFFormElement labelValue="Description" labelName="parents-events-description">
                <TextInput id="parents-events-description" placeholder="Description" value={eventsText?.text} required
                           onChange={(event) => {
                               // update the title
                           }}/>
            </LFFormElement>
        </LFFormSection>
        <LFFormSection sectionTitle={'Parents Events'}>
            {parentsEvents.map((event, index) => {
                return <Fragment key={`event-${event.name}`}>
                    <LFFormElement labelValue="Name" labelName="parents-event-name">
                        <TextInput id="parents-event-name" placeholder="Event Name" value={event?.name} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Description" labelName="parents-event-description">
                        <TextInput id="parents-event-description" placeholder="Event Description"
                                   value={event?.description} required onChange={(event) => {
                            // update the title
                        }}/>
                    </LFFormElement>
                    <LFFormElement labelValue="Dates" labelName="parents-event-dates">
                        <TextInput id="parents-event-dates" placeholder="Event Dates" value={event?.dates} required
                                   onChange={(event) => {
                                       // update the title
                                   }}/>
                    </LFFormElement>
                    <Dropzone imagePath={event?.image} withPopover/>
                </Fragment>
            })}
        </LFFormSection>
    </Fragment>
}
export default ParentsEvents