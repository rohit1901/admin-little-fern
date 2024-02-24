import {PropsWithChildren} from "react";

const LFForm = ({children}: PropsWithChildren) => {
    return (
        <form className='divide-y-2 divide-dashed divide-purple-800'>
            {children}
        </form>
    )
}
export default LFForm