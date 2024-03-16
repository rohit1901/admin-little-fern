import {Dropdown} from "flowbite-react";
import {MdOutlineAccessTime} from "react-icons/md";
import {useState} from "react";
import {BsDash} from "react-icons/bs";
import {LFScheduleData} from "@admin/types";
import {TIMES} from "@admin/lib/constants";

export const LFTimepickerLabel = ({time}: { time?: string }) =>
    <div className="flex flex-row items-center"><p>{time ? time : "Select Time"}</p><MdOutlineAccessTime className="text-sm ml-2"/></div>
type LFTimepickerProps = {
    fromTimeString?: string;
    toTimeString?: string;
    action: (scheduleData: Partial<LFScheduleData>) => void;
}
export const LFTimepicker = ({fromTimeString, toTimeString, action}: LFTimepickerProps) => {
    const [fromTime, setFromTime] = useState(fromTimeString ?? TIMES[0])
    const [toTime, setToTime] = useState(toTimeString ?? TIMES[0])
    return <div className="flex flex-wrap justify-between items-center">
        <Dropdown label={<LFTimepickerLabel time={fromTime}/>} id="time" className="w-32" value={fromTime} arrowIcon={false}>
            {TIMES.map((time, index) =>
                <Dropdown.Item key={index} className="dropdown-item"
                               icon={MdOutlineAccessTime} type="button" value={time} onClick={() => {
                    setFromTime(time)
                    action({
                        fromTime: time,
                        toTime: toTime
                    })
                }}>{time}</Dropdown.Item>)
            }
        </Dropdown>
        <BsDash className="text-2xl text-gray-500"/>
        <Dropdown label={<LFTimepickerLabel time={toTime}/>} id="time" className="w-32" value={toTime} arrowIcon={false}>
            {TIMES.map((time, index) =>
                <Dropdown.Item key={index} className="dropdown-item"
                               icon={MdOutlineAccessTime} type="button" value={time} onClick={() => {
                    setToTime(time)
                    action({
                        fromTime: fromTime,
                        toTime: time
                    })
                }}>{time}</Dropdown.Item>)
            }
        </Dropdown>
    </div>
}