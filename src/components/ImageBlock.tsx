import Image from "next/image";
import Dropzone from "@admin/components/Dropzone";
import {getImageUrl, getS3UploadKey, isEmailAuthorized} from "@admin/lib";
import {Button, FileInput, Label, Spinner} from "flowbite-react";
import {useState} from "react";
import {uploadToS3} from "@admin/lib/s3";
import {useSession} from "next-auth/react";
import {HiMiniCloudArrowUp} from "react-icons/hi2";
import {useSettingsStore} from "@admin/store/useSettingsStore";

type ImageBlockProps = {
    imagePath?: string
    dropzone?: boolean
    label?: string
    afterUpload?: () => void
}
const ImageUploader = ({imagePath, dropzone = true}: ImageBlockProps) => {
    if (dropzone) {
        return <Dropzone imagePath={imagePath}/>
    }
    return <div className="mt-1 mb-2">
        <FileInput id={`inline-file-upload-${imagePath}`} is="button" required/>
    </div>
}
const UploadButton = ({imagePath, afterUpload, dropzone}: ImageBlockProps) => {
    const [uploading, setUploading] = useState(false);
    const {data: session} = useSession()
    if (!isEmailAuthorized(session)) return null
    return (
        <div className="flex">
            <Button disabled={uploading}
                    outline
                    onClick={() => {
                        setUploading(true);
                        if (!imagePath) {
                            setUploading(false);
                            console.error('No image path provided');
                            return;
                        }
                        const fileInput = dropzone ?
                            document.getElementById(`dropzone-file-${imagePath}`) as HTMLInputElement :
                            document.getElementById(`inline-file-upload-${imagePath}`) as HTMLInputElement;
                        const file = fileInput?.files?.[0];
                        if (!file) {
                            alert('Please select a file to upload.');
                            setUploading(false);
                            return;
                        }
                        uploadToS3(getS3UploadKey(imagePath), file).then((res) => {
                            console.info('Successfully uploaded image to S3');
                            afterUpload?.();
                        }).catch((err) => {
                            console.error('Error uploading image to S3', err);
                        }).finally(() => {
                            setUploading(false);
                        })
                    }}>{uploading ? <Spinner/> : <div className="flex flex-row items-center">
                <HiMiniCloudArrowUp className="mr-2 h-5 w-5"/>
                <p>Upload</p>
            </div>}
            </Button>
        </div>
    )
}
export const ImageBlock = ({imagePath, dropzone = true, label, afterUpload}: ImageBlockProps) => {
    const {imagePreviews} = useSettingsStore()
    if (!dropzone) return (
        <div className="flex flex-col rounded-lg mb-10">
            <div className=" border-b-2 border-gray-100 mb-2">
                {label && <div className="mb-2 block">
                    <Label className="text-cyan-800" value={label}/>
                    <div
                        className="h-1 w-10 bg-cyan-700 rounded hover:bg-cyan-500 dark:bg-cyan-50 dark:hover:bg-cyan-500"></div>
                </div>}
                <ImageUploader imagePath={imagePath} dropzone={dropzone}/>
            </div>
            <UploadButton imagePath={imagePath} afterUpload={afterUpload} dropzone={dropzone}/>
        </div>
    )
    return <div className="rounded-lg mt-10 mb-10">
        <div className="mx-auto">
            {imagePreviews && imagePath && <div className="rounded-lg h-64 overflow-hidden">
                <Image alt="content" width={1200} height={500}
                       className="object-cover object-center h-full w-full"
                       src={getImageUrl(imagePath)}/>
            </div>}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <ImageUploader imagePath={imagePath} dropzone={dropzone}/>
            </div>
            <UploadButton imagePath={imagePath} dropzone={dropzone}/>
        </div>
    </div>
}