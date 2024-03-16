import {Badge, Datepicker} from "flowbite-react";
import {createDate, formatDate, parseDateFromString} from "@admin/lib";
import {useState} from "react";
import {BsDash} from "react-icons/bs";

type LFDatesProps = {
    dateString: string;
    action: (dates: string) => void
}
export const LFDates = ({dateString, action}: LFDatesProps) => {
    const [fromDate, setFromDate] = useState(parseDateFromString(dateString)?.fromDate)
    const [toDate, setToDate] = useState(parseDateFromString(dateString)?.toDate)
    return (<div className="flex flex-row justify-between mb-2 items-center">
        <Badge color="green" className="cursor-not-allowed">{dateString}</Badge>
        <Datepicker id="program-info-date-from" title="Program begin date" autoHide value={fromDate}
                    showClearButton={false}
                    onSelectedDateChanged={(event) => {
                        const formattedDate = formatDate(event)
                        setFromDate(formattedDate)
                        action(createDate(formattedDate, toDate) ?? '')
                    }}/>
        <BsDash className="text-2xl text-gray-500"/>
        <Datepicker id="program-info-date-to" title="Program end date" value={toDate} autoHide
                    showClearButton={false}
                    onSelectedDateChanged={(event) => {
                        const formattedDate = formatDate(event)
                        setToDate(formattedDate)
                        action(createDate(fromDate, formattedDate) ?? '')
                    }}/>
    </div>)
}