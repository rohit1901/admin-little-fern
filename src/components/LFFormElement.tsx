import {Fragment, PropsWithChildren, ReactNode} from "react";
import {Card, Label} from "flowbite-react";
import {useSession} from "next-auth/react";
import {Session} from "next-auth";
import {isEmailAuthorized} from "@admin/lib";

type LFFormElementProps = {
    labelValue?: string;
    labelName?: string;
    elemValue?: string;
    className?: string;
}
const getNonAuthElem = (session: Session | null, children: ReactNode, elemValue?: string) => {
    if (isEmailAuthorized(session)) {
        if (elemValue === undefined || elemValue === null) return null
        return <Fragment>{children}</Fragment>
    }
    return (
        <Card className="dark:border-primary-50 bg-gray-100">
            <p className="text-sm text-cyan-800 dark:text-cyan-50">
                {elemValue}
            </p>
        </Card>
    )
}
const LFFormElement = ({labelValue, labelName, elemValue, className, children}: PropsWithChildren<LFFormElementProps>) => {
    const {data} = useSession()

    return (
        <div className={className}>
            <div className="my-2 block">
                {labelValue && <Label className="text-cyan-800" htmlFor={labelName} value={labelValue}/>}
                <div
                    className="h-1 w-10 bg-cyan-700 rounded hover:bg-cyan-500 dark:bg-cyan-50 dark:hover:bg-cyan-500"></div>
            </div>
            {getNonAuthElem(data, children, elemValue)}
        </div>
    )
}
export default LFFormElement;