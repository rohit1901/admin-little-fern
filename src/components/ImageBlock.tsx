import Image from "next/image";
import Dropzone from "@admin/components/Dropzone";
import {getImageUrl, getS3UploadKey, isEmailAuthorized} from "@admin/lib";
import {Button, Spinner} from "flowbite-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {uploadToS3} from "@admin/lib/s3";
import {useSession} from "next-auth/react";

type ImageBlockProps = {
    imagePath?: string
}
export const ImageBlock = ({imagePath}: ImageBlockProps) => {
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const {data: session} = useSession()
    return <div className="rounded-lg mt-10 mb-10">
        <div className="mx-auto">
            {imagePath && <div className="rounded-lg h-64 overflow-hidden">
                <Image alt="content" width={1200} height={500}
                       className="object-cover object-center h-full w-full"
                       src={getImageUrl(imagePath)}/>
            </div>}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <Dropzone imagePath={imagePath} withPopover/>
            </div>
            {isEmailAuthorized(session) && <div className="flex">
                <Button disabled={uploading}
                        outline
                        onClick={() => {
                            setUploading(true);
                            if (!imagePath) {
                                setUploading(false);
                                return;
                            }
                            const fileInput = document.getElementById(`dropzone-file-${imagePath}`) as HTMLInputElement;
                            const file = fileInput.files?.[0];
                            if (!file) {
                                alert('Please select a file to upload.');
                                setUploading(false);
                                return;
                            }
                            uploadToS3(getS3UploadKey(imagePath), file).then((res) => {
                                console.info('Successfully uploaded image to S3');
                                router.refresh();
                            }).catch((err) => {
                                console.error('Error uploading image to S3', err);
                            }).finally(() => {
                                setUploading(false);
                            })
                        }}>{uploading ? <Spinner/> : 'Upload'}
                </Button>
            </div>}
        </div>
    </div>
}