import {Dropdown} from "flowbite-react";
import {useState} from "react";
import {BsDash} from "react-icons/bs";
import {LFScheduleData} from "@admin/types";
import {DAYS_OF_WEEK} from "@admin/lib/constants";

type LFDayRangePickerProps = {
    fromDay?: string;
    toDay?: string;
    action: (scheduleData: Partial<LFScheduleData>) => void;
}
export const LFDayRangePicker = ({fromDay, toDay, action}: LFDayRangePickerProps) => {
    const [selectedFromDay, setSelectedFromDay] = useState(fromDay ?? DAYS_OF_WEEK[0])
    const [selectedToDay, setSelectedToDay] = useState(toDay ?? DAYS_OF_WEEK[0])
    return <div className="flex flex-wrap justify-between mb-2 items-center">
        <Dropdown label={selectedFromDay} id="from-day" className="w-32" value={selectedFromDay} arrowIcon={false}>
            {DAYS_OF_WEEK.map((day, index) =>
                <Dropdown.Item key={index} className="dropdown-item"
                               type="button" value={day} onClick={() => {
                    setSelectedFromDay(day)
                    action({
                        fromDay: day,
                        toDay: selectedToDay
                    })
                }}>{day}</Dropdown.Item>)
            }
        </Dropdown>
        <BsDash className="text-2xl text-gray-500"/>
        <Dropdown label={toDay} id="to-day" className="w-32" value={toDay} arrowIcon={false}>
            {DAYS_OF_WEEK.map((day, index) =>
                <Dropdown.Item key={index} className="dropdown-item"
                               type="button" value={day} onClick={() => {
                    setSelectedToDay(day)
                    action({
                        fromDay: selectedFromDay,
                        toDay: day
                    })
                }}>{day}</Dropdown.Item>)
            }
        </Dropdown>
    </div>
}