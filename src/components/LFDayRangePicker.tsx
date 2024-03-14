import {Dropdown} from "flowbite-react";
import {useState} from "react";
import {BsDash} from "react-icons/bs";

const DAYS = ['Sun', 'M', 'Tue', 'W', 'Thu', 'F', 'Sat'];
type LFDayRangePickerProps = {
    fromDayString?: string;
    toDayString?: string;
    action: (scheduleString: string) => void;
}
export const LFDayRangePicker = ({fromDayString, toDayString, action}: LFDayRangePickerProps) => {
    const [fromDay, setFromDay] = useState(fromDayString ?? DAYS[0])
    const [toDay, setToDay] = useState(toDayString ?? DAYS[0])
    return <div className="flex flex-wrap justify-between mb-2 items-center">
        <Dropdown label={fromDay} id="from-day" className="w-32" value={fromDay} arrowIcon={false}>
            {DAYS.map((day, index) =>
                <Dropdown.Item key={index} className="dropdown-item"
                               type="button" value={day} onClick={() => {
                    setFromDay(day)
                    action(`${day}-${toDay}`)
                }}>{day}</Dropdown.Item>)
            }
        </Dropdown>
        <BsDash className="text-2xl text-gray-500"/>
        <Dropdown label={toDay} id="to-day" className="w-32" value={toDay} arrowIcon={false}>
            {DAYS.map((day, index) =>
                <Dropdown.Item key={index} className="dropdown-item"
                               type="button" value={day} onClick={() => {
                    setToDay(day)
                    action(`${fromDay}-${day}`)
                }}>{day}</Dropdown.Item>)
            }
        </Dropdown>
    </div>
}