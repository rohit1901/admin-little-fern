'use client'
import {Fragment, PropsWithChildren} from "react";
import {Button} from "flowbite-react";
import {useHomePageStore} from "@admin/store";
import {HomePageData} from "@admin/types";

const LFForm = ({children}: PropsWithChildren) => {
    const homePage: HomePageData = useHomePageStore((state) => state.homePageData)
    return (
        <Fragment>
            <form className='divide-y-2 divide-slate-200'>
                {children}
            </form>
            <div className="flex flex-wrap gap-2 mt-2">
                <Button type="submit">Reset</Button>
                <Button type="submit" onClick={() => console.log('Form submitted', homePage)}>Save</Button>
            </div>
        </Fragment>
    )
}
export default LFForm