import {Session} from "next-auth";
import {isEmailAuthorized} from "@admin/lib";
import {Fragment} from "react";
import {Button, Spinner} from "flowbite-react";
import {IoReload} from "react-icons/io5";
import {IoIosSave} from "react-icons/io";

type LFFormButtonGroupProps = {
    session: Session | null,
    loading?: boolean
}
export const LFFormButtonGroup = ({session, loading}: LFFormButtonGroupProps) => {
    if (!isEmailAuthorized(session)) return <Fragment/>
    return <div className="flex flex-wrap gap-2 mt-2">
        <Button className="m-0" disabled={loading} outline onClick={() => {
            window.location.reload()
        }}>
            <div className="flex items-center">
                <IoReload className="mr-2 h-5 w-5"/>
                <p>Reset</p>
            </div>
        </Button>
        <Button className="m-0" disabled={loading} type="submit" outline>{loading ? <Spinner/> :
            <div className="flex items-center">
                <IoIosSave className="mr-2 h-5 w-5"/>
                <p>Update</p>
            </div>}
        </Button>
    </div>
}