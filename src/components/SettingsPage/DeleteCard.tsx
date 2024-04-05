'use client'
import {Banner, Button, Card, Spinner} from "flowbite-react";
import {useState} from "react";
import {TbDatabaseX} from "react-icons/tb";
import {RiDeleteBin6Fill} from "react-icons/ri";
import {HiMiniInformationCircle} from "react-icons/hi2";
import {useSession} from "next-auth/react";
import {isEmailAuthorized} from "@admin/lib";

export const DeleteCard = () => {
    const [isDeleting, setIsDeleting] = useState(false)
    const {data: session} = useSession()
    return <Card className="max-w-sm dark:border-primary-50">
        <h5 className="text-2xl font-bold tracking-tight text-cyan-800 dark:text-cyan-50">
            <TbDatabaseX/>
            <div className='flex flex-wrap items-center'>
                <p>Clean up old data</p>
            </div>

        </h5>
        <p className="font-normal text-cyan-700 dark:text-cyan-50">
            This will delete all but the latest data from the database and is useful if you want to clean up the database.
        </p>
        <Banner
            className="flex justify-between items-center rounded border-b border-gray-200 bg-gray-50 dark:border-cyan-50 dark:bg-cyan-50 p-2">
            <HiMiniInformationCircle className="mr-2 h-5 w-5 text-cyan-800"/>
            <p className="font-mono text-xs text-cyan-800">Proceed with caution. This action cannot be undone.</p>
        </Banner>
        <div className="flex flex-wrap">
            <Button
                className='m-0'
                outline
                disabled={isDeleting || !isEmailAuthorized(session)} onClick={async () => {
                setIsDeleting(true)
                await fetch('/api/settings/delete')
                setIsDeleting(false)
            }}>
                {isDeleting ? <Spinner/> : <div className='flex flex-wrap items-center'>
                    <RiDeleteBin6Fill className="mr-2 h-4 w-4 text-cyan-50 dark:text-cyan-800"/>
                    <p>Clean up</p>
                </div>}
            </Button>
        </div>
    </Card>
}