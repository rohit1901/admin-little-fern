'use client'
import {Button, Card, Spinner, useThemeMode} from "flowbite-react";
import {useEffect, useState} from "react";
import {getS3Status} from "@admin/lib/s3";
import {AWSError} from "aws-sdk/lib/error";
import * as AWS from "aws-sdk";
import {FaAws} from "react-icons/fa";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import {GrHeroku} from "react-icons/gr";
import {HerokuStatusResponseType} from "@admin/types";
import {DiMongodb} from "react-icons/di";
import {PageHeader} from "@admin/components/PageHeader";
import {IoReload} from "react-icons/io5";
import {useSession} from "next-auth/react";
import {ScreenLoader} from "@admin/components/Loaders";
import {isEmailAuthorized} from "@admin/lib";
import {EmailStatistics} from "@admin/components/Dashboard/EmailStatistics";
export default function Dashboard() {
    const {data: session, status} = useSession()
    const {mode} = useThemeMode()
    const [s3Status, setS3Status] = useState(false)
    const [checkingS3Status, setCheckingS3Status] = useState(false)
    const [herokuStatus, setHerokuStatus] = useState(false)
    const [checkingHerokuStatus, setCheckingHerokuStatus] = useState(false)
    const [mongoDBStatus, setMongoDBStatus] = useState(false)
    const [checkingMongoDBStatus, setCheckingMongoDBStatus] = useState(false)
    useEffect(() => {
        checkS3Status()
        checkHerokuStatus().then(r => r)
        checkMongoDBStatus().then(r => r)
    }, [])
    const checkHerokuStatus = async () => {
        setCheckingHerokuStatus(true)
        await fetch('https://status.heroku.com/api/v4/current-status')
            .then(r => r.json())
            .then((v: HerokuStatusResponseType) => {
                setHerokuStatus(v?.status?.find(s => s.system === 'Apps')?.status === 'green') // 'green' or 'red
            }).catch((e: string) => {
                setHerokuStatus(false)
            }).finally(() => setCheckingHerokuStatus(false))

    }
    const checkS3Status = () => {
        setCheckingS3Status(true)
        getS3Status(callback)
    }
    const checkMongoDBStatus = async () => {
        setCheckingMongoDBStatus(true)
        await fetch('/api/mongo/status').then((v) => {
            console.info("MongoDB is connected.")
            setMongoDBStatus(true)
        }).catch((e) => {
            console.error("Error fetching MongoDB status", e);
            setMongoDBStatus(false)
        }).finally(() => setCheckingMongoDBStatus(false))
    }
    const callback = (err: AWSError, data: AWS.S3.Types.HeadBucketOutput) => {
        if (err) {
            console.error("Error fetching S3 status", err);
            setS3Status(false)
        } else {
            console.info("Successfully fetched S3 status");
            setS3Status(true)
        }
        setCheckingS3Status(false)
    }
    if (status === "loading") return <ScreenLoader/>
    if (status === "unauthenticated") return null
    return (
        <main className='p-8 mx-auto md:ml-64 h-auto bg-white-50 dark:bg-gray-800'>
            <PageHeader title="Dashboard"/>
            <EmailStatistics/>
            <div className='flex flex-row gap-4 mt-4 justify-between'>
                <Card className="max-w-sm dark:border-primary-50">
                    <h5 className="text-2xl font-bold tracking-tight text-cyan-800 dark:text-cyan-50">
                        <FaAws color={mode === "dark" ? 'white' : '#CC7A00'}/>
                        <div className='flex flex-wrap items-center mt-1'><p>AWS S3 Status</p> <p className="ml-2">{s3Status ?
                            <AiFillCheckCircle color='green'></AiFillCheckCircle> :
                            <AiFillCloseCircle color='red'></AiFillCloseCircle>}</p></div>

                    </h5>
                    <p className="font-normal text-cyan-700 dark:text-cyan-50">
                        Check AWS S3 status by clicking the button below. S3 is used for storing files and images in
                        the <a className='text-blue-500 hover:underline' href='https://www.littlefern.in'>Little
                        Fern</a> website.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            outline
                            disabled={checkingS3Status || !isEmailAuthorized(session)} onClick={async () => checkS3Status()}>
                            {checkingS3Status ? <Spinner/> : <div className='flex flex-row gap-2 items-center'>
                                <IoReload className="h-5 w-5"/>
                                <span>Check S3 Status</span>
                            </div>}
                        </Button>
                    </div>
                </Card>
                <Card className="max-w-sm dark:border-primary-50">
                    <h5 className="text-2xl font-bold tracking-tight text-cyan-800 dark:text-cyan-50">
                        <GrHeroku color={mode === "dark" ? 'white' : 'purple'}/>
                        <div className='flex flex-wrap items-center mt-1'><p>Heroku Dyno Status</p> <p className="ml-2">{herokuStatus ?
                            <AiFillCheckCircle color='green'></AiFillCheckCircle> :
                            <AiFillCloseCircle color='red'></AiFillCloseCircle>}</p></div>

                    </h5>
                    <p className="font-normal text-cyan-700 dark:text-cyan-50">
                        Check Heroku Dyno status by clicking the button below. Heroku is used for hosting the
                        <a className='text-blue-500 hover:underline' href='https://www.littlefern.in'> Little
                            Fern</a> website.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            outline
                            disabled={checkingHerokuStatus || !isEmailAuthorized(session)} onClick={async () => checkHerokuStatus()}>
                            {checkingHerokuStatus ? <Spinner/> : <div className='flex flex-row gap-2 items-center'>
                                <IoReload className="h-5 w-5"/>
                                <span>Check Heroku Status</span>
                            </div>}
                        </Button>
                    </div>
                </Card>
                <Card className="max-w-sm dark:border-primary-50">
                    <h5 className="text-2xl font-bold tracking-tight text-cyan-800 dark:text-cyan-50">
                        <DiMongodb color="green"/>
                        <div className='flex flex-wrap items-center mt-1'><p>Mongo DB</p> <p className="ml-2">{mongoDBStatus ?
                            <AiFillCheckCircle color='green'></AiFillCheckCircle> :
                            <AiFillCloseCircle color='red'></AiFillCloseCircle>}</p></div>

                    </h5>
                    <p className="font-normal text-cyan-700 dark:text-cyan-50">
                        Check MongoDB status by clicking the button below. MongoDB is used for storing data in the
                        <a className='text-blue-500 hover:underline' href='https://www.littlefern.in'> Little
                            Fern</a> website.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            outline
                            disabled={checkingMongoDBStatus || !isEmailAuthorized(session)} onClick={async () => checkMongoDBStatus()}>
                            {checkingMongoDBStatus ? <Spinner/> : <div className='flex flex-row gap-2 items-center'>
                                <IoReload className="h-5 w-5"/>
                                <span>Check MongoDB Status</span>
                            </div>}
                        </Button>
                    </div>
                </Card>
            </div>
        </main>);
}
