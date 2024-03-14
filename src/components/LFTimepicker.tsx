import {Dropdown} from "flowbite-react";
import {MdOutlineAccessTime} from "react-icons/md";
import {useState} from "react";
import {BsDash} from "react-icons/bs";

const TIMES = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
]
export const LFTimepickerLabel = ({time}: { time?: string }) =>
    <div className="flex flex-row items-center"><p>{time ? time : "Select Time"}</p><MdOutlineAccessTime className="text-sm ml-2"/></div>
type LFTimepickerProps = {
    fromTimeString?: string;
    toTimeString?: string;
}
export const LFTimepicker = ({fromTimeString, toTimeString}: LFTimepickerProps) => {
    const [fromTime, setFromTime] = useState(fromTimeString ? fromTimeString.split('AM')[0] : TIMES[0])
    const [toTime, setToTime] = useState(toTimeString ? toTimeString.split('PM')[0] : TIMES[0])
    const [ampmFrom, setAmpmFrom] = useState('AM')
    const [ampmTo, setAmpmTo] = useState('PM')
    return <div className="flex flex-wrap justify-between mb-2 items-center">
        <Dropdown label={<LFTimepickerLabel time={fromTime}/>} id="time" className="w-32" value={fromTime} arrowIcon={false}>
            {TIMES.map((time, index) =>
                <Dropdown.Item key={index} className="dropdown-item"
                               icon={MdOutlineAccessTime} type="button" value={time} onClick={() => setFromTime(time)}>{time}</Dropdown.Item>)
            }
        </Dropdown>
        <Dropdown label={ampmFrom ? ampmFrom : "Select AM/PM"} id="ampm" className="w-32" value={ampmFrom}>
            <Dropdown.Item className="dropdown-item" type="button" value="AM" onClick={() => setAmpmFrom("AM")}>AM</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" type="button" value="PM" onClick={() => setAmpmFrom("PM")}>PM</Dropdown.Item>
        </Dropdown>
        <BsDash className="text-2xl text-gray-500"/>
        <Dropdown label={<LFTimepickerLabel time={toTime}/>} id="time" className="w-32" value={toTime} arrowIcon={false}>
            {TIMES.map((time, index) =>
                <Dropdown.Item key={index} className="dropdown-item"
                               icon={MdOutlineAccessTime} type="button" value={time} onClick={() => setToTime(time)}>{time}</Dropdown.Item>)
            }
        </Dropdown>
        <Dropdown label={ampmTo ? ampmTo : "Select AM/PM"} id="ampm" className="w-32" value={ampmTo}>
            <Dropdown.Item className="dropdown-item" type="button" value="AM" onClick={() => setAmpmTo("AM")}>AM</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" type="button" value="PM" onClick={() => setAmpmTo("PM")}>PM</Dropdown.Item>
        </Dropdown>
    </div>
}