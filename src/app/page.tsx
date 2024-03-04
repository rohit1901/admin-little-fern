'use client'
import {Button, Card, Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import {getS3Status} from "@admin/lib/s3";
import {AWSError} from "aws-sdk/lib/error";
import * as AWS from "aws-sdk";
import {FaAws} from "react-icons/fa";
import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
import {GrHeroku} from "react-icons/gr";
import {HerokuStatuaResponseType} from "@admin/types";
import {DiMongodb} from "react-icons/di";

export default function Home() {
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
        await fetch('https://status.heroku.com/api/v4/current-status').then(r => r.json()).then((v: HerokuStatuaResponseType) => {
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
        await fetch('/api/status/get').then((v) => {
            setMongoDBStatus(true)
        }).catch((e) => {
            setMongoDBStatus(false)
        }).finally(() => setCheckingMongoDBStatus(false))
    }
    const callback = (err: AWSError, data: AWS.S3.Types.HeadBucketOutput) => {
        if (err) {
            console.log("Error fetching S3 status", err);
            setS3Status(false)
        } else {
            console.log("Successfully fetched S3 status");
            setS3Status(true)
        }
        setCheckingS3Status(false)
    }
    return (<main className='p-8 mx-auto md:ml-64 h-auto pt-20 bg-white-50 dark:bg-gray-800'>
        <div className='flex flex-row gap-4 mt-4 content-center'>
            <Card className="max-w-sm dark:border-primary-50">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <FaAws/>
                    <div className='flex flex-wrap items-center'><p>AWS S3 Status:</p> <p>{s3Status ?
                        <AiFillCheckCircle color='green'></AiFillCheckCircle> :
                        <AiFillCloseCircle color='red'></AiFillCloseCircle>}</p></div>

                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Check AWS S3 status by clicking the button below. S3 is used for storing files and images in
                    the <a className='text-blue-500 hover:underline' href='https://www.littlefern.in'>Little
                    Fern</a> website.
                </p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        className='dark:bg-primary-50 dark:text-cyan-900 dark:hover:bg-cyan-800 dark:hover:text-white'
                        disabled={checkingS3Status} onClick={async () => checkS3Status()}>
                        {checkingS3Status ? <Spinner/> : 'Check S3 Status'}
                    </Button>
                </div>
            </Card>
            <Card className="max-w-sm dark:border-primary-50">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <GrHeroku color='purple'/>
                    <div className='flex flex-wrap items-center'><p>Heroku Dyno Status:</p> <p>{herokuStatus ?
                        <AiFillCheckCircle color='green'></AiFillCheckCircle> :
                        <AiFillCloseCircle color='red'></AiFillCloseCircle>}</p></div>

                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Check Heroku Dyno status by clicking the button below. Heroku is used for hosting the
                    <a className='text-blue-500 hover:underline' href='https://www.littlefern.in'>Little
                        Fern</a> website.
                </p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        className='dark:bg-primary-50 dark:text-cyan-900 dark:hover:bg-cyan-800 dark:hover:text-white'
                        disabled={checkingHerokuStatus} onClick={async () => checkHerokuStatus()}>
                        {checkingHerokuStatus ? <Spinner/> : 'Check Heroku Status'}
                    </Button>
                </div>
            </Card>
            <Card className="max-w-sm dark:border-primary-50">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <DiMongodb color='green'/>
                    <div className='flex flex-wrap items-center'><p>Mongo DB:</p> <p>{mongoDBStatus ?
                        <AiFillCheckCircle color='green'></AiFillCheckCircle> :
                        <AiFillCloseCircle color='red'></AiFillCloseCircle>}</p></div>

                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Check MongoDB status by clicking the button below. MongoDB is used for storing data in the
                    <a className='text-blue-500 hover:underline' href='https://www.littlefern.in'>Little
                        Fern</a> website.
                </p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        className='dark:bg-primary-50 dark:text-cyan-900 dark:hover:bg-cyan-800 dark:hover:text-white'
                        disabled={checkingMongoDBStatus} onClick={async () => checkMongoDBStatus()}>
                        {checkingMongoDBStatus ? <Spinner/> : 'Check MongoDB Status'}
                    </Button>
                </div>
            </Card>
        </div>
    </main>);
}
