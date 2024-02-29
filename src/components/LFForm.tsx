import {Fragment, PropsWithChildren, useState} from "react";
import {Button, Spinner} from "flowbite-react";
import {usePathname} from "next/navigation";
import {WithId} from "mongodb";
import {AboutPageData, ContactPageData, GalleryPageData, HomePageData, ParentsPageData} from "@admin/types";

type PathnameMapping = {
    [key: string]: string
}
const pathnameMappping: PathnameMapping = {
    '/website-pages/Home': '/api/home/update',
    '/website-pages/About': '/api/about/update',
    '/website-pages/Contact': '/api/contact/update',
    '/website-pages/Parents': '/api/parents/update',
    '/website-pages/Gallery': '/api/gallery/update',
}
const getApiPath = (path: string) => {

    return pathnameMappping[path]
}
type LFFormProps = {
    data?: WithId<HomePageData | ParentsPageData | GalleryPageData | ContactPageData | AboutPageData>
    updateState?: (data: WithId<HomePageData | ParentsPageData | GalleryPageData | ContactPageData | AboutPageData>) => void
}
const LFForm = ({children, data, updateState}: PropsWithChildren<LFFormProps>) => {
    const pathname = usePathname()
    const [loading, setLoading] = useState(false)

    return (<Fragment>
        <form className='divide-y-2 divide-slate-200'>
            {children}
        </form>
        <div className="flex flex-wrap gap-2 mt-2">
            <Button type="submit">Reset</Button>
            <Button disabled={loading} type="submit" onClick={async () => {
                if (!pathname) return
                setLoading(true)
                const res = await fetch(getApiPath(pathname), {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify(data),
                })
                const r = await res.json()
                updateState && updateState(r.body)
                setLoading(false)
            }}>{loading ? <Spinner/> : 'Update'}</Button>
        </div>
    </Fragment>)
}
export default LFForm