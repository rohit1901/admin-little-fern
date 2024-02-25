import {Fragment, PropsWithChildren} from "react";
import {Button} from "flowbite-react";

const LFForm = ({children}: PropsWithChildren) => {
    return (
        <Fragment>
            <form className='divide-y-2 divide-slate-200'>
                {children}
            </form>
            <div className="flex flex-wrap gap-2 mt-2">
                <Button type="submit">Reset</Button>
                <Button type="submit">Submit</Button>
            </div>
        </Fragment>
    )
}
export default LFForm