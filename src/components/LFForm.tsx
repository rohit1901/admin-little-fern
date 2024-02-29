import {Fragment, PropsWithChildren, useState} from "react";
import {Button, Spinner} from "flowbite-react";
import {useHomePageStore} from "@admin/store";

const LFForm = ({children}: PropsWithChildren) => {
    const {homePageData, setHomePageData} = useHomePageStore()
    const [loading, setLoading] = useState(false)
    return (
        <Fragment>
            <form className='divide-y-2 divide-slate-200'>
                {children}
            </form>
            <div className="flex flex-wrap gap-2 mt-2">
                <Button type="submit">Reset</Button>
                <Button disabled={loading} type="submit" onClick={async () => {
                    setLoading(true)
                    const res = await fetch('/api/home/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(homePageData),
                    })
                    const r = await res.json()
                    setHomePageData(r.body)
                    setLoading(false)
                }}>{loading ? <Spinner></Spinner> : 'Update'}</Button>
            </div>
        </Fragment>
    )
}
export default LFForm