import {Fragment, PropsWithChildren} from "react";
import {Card, Label} from "flowbite-react";
import {useSession} from "next-auth/react";
import {Session} from "next-auth";
import {isEmailAuthorized} from "@admin/lib";

type LFFormElementProps = {
    labelValue?: string;
    labelName: string;
    elemValue?: string;
}
const LFFormElement = ({labelValue, labelName, elemValue, children}: PropsWithChildren<LFFormElementProps>) => {
    const {data} = useSession()
    const getNonAuthElem = (elemValue?: string, session?: Session | null) => {
        if (isEmailAuthorized(data)) {
            return <Fragment>{elemValue && children}</Fragment>
        }
        return (
            <Card className="max-w-sm dark:border-primary-50">
                <p className="font-normal text-gray-700 dark:text-cyan-50">
                    {elemValue}
                </p>
            </Card>
        )
    }
    return (
        <div>
            <div className="my-2 block">
                {labelValue && <Label className="text-cyan-800" htmlFor={labelName} value={labelValue}/>}
                <div
                    className="h-1 w-10 bg-cyan-700 rounded hover:bg-cyan-500 dark:bg-cyan-50 dark:hover:bg-cyan-500"></div>
            </div>
            {getNonAuthElem(elemValue, data)}
        </div>
    )
}
export default LFFormElement;