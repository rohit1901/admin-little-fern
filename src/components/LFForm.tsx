import {Fragment, PropsWithChildren, useState} from "react";
import {Button, Spinner} from "flowbite-react";
import {usePathname} from "next/navigation";
import {WithId} from "mongodb";
import {
    AboutPageData,
    ContactPageData,
    GalleryPageData,
    HomePageData,
    ParentsPageData,
    SchoolProgram
} from "@admin/types";
import {isEmailAuthorized, isHomePageData} from "@admin/lib";
import {useSession} from "next-auth/react";
import {useHomePageStore} from "@admin/store";
import {useSchoolProgramsPageStore} from "@admin/store/useSchoolProgramsPageStore";

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
    if (!pathnameMappping[path] && path.includes('programs')) return '/api/home/update'
    return pathnameMappping[path]
}
type LFFormProps = {
    data?: WithId<HomePageData | ParentsPageData | GalleryPageData | ContactPageData | AboutPageData>
    updateState?: (data: WithId<HomePageData | ParentsPageData | GalleryPageData | ContactPageData | AboutPageData>) => void
    isProgram?: boolean
}
const handleProgramUpdate = async (data: WithId<SchoolProgram>[], homePageData: WithId<HomePageData>, pathname: string, setHomePageData: (data: WithId<HomePageData>) => void) => {
    const newHomePageData: WithId<HomePageData> = {
        ...homePageData,
        schoolProgramsBlock: {...homePageData.schoolProgramsBlock, schoolPrograms: data}
    }
    const res = await fetch(getApiPath(pathname), {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(newHomePageData)
    })
    const r = await res.json()
    if (isHomePageData(r.body)) setHomePageData(JSON.parse(JSON.stringify(r.body)))
}

const LFForm = ({children, data, updateState, isProgram}: PropsWithChildren<LFFormProps>) => {
    const {data: session} = useSession()
    const pathname = usePathname()
    const {programs} = useSchoolProgramsPageStore()
    const {homePageData, setHomePageData} = useHomePageStore()
    const [loading, setLoading] = useState(false)
    return (<Fragment>
        <form className='divide-y-2 divide-slate-200'>
            {children}
        </form>
        {isEmailAuthorized(session) && <div className="flex flex-wrap gap-2 mt-2">
            <Button type="submit" outline>Reset</Button>
            <Button disabled={loading} type="submit" onClick={async () => {
                if (!pathname) return
                setLoading(true)
                if (!isProgram) {
                    const res = await fetch(getApiPath(pathname), {
                        method: 'POST', headers: {
                            'Content-Type': 'application/json',
                        }, body: JSON.stringify(data)
                    })
                    const r = await res.json()
                    updateState && updateState(r.body)
                } else await handleProgramUpdate(programs, homePageData, pathname, setHomePageData)
                setLoading(false)
            }} outline>{loading ? <Spinner/> : 'Update'}</Button>
        </div>}
    </Fragment>)
}
export default LFForm