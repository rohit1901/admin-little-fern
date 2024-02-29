import Image from "next/image";
import Dropzone from "@admin/components/Dropzone";
import {getImageUrl} from "@admin/lib";
import {Button} from "flowbite-react";

type ImageBlockProps = {
    imagePath?: string
}
export const ImageBlock = ({imagePath}: ImageBlockProps) => {
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
            <div className="flex">
                <Button
                    className="flex ml-auto text-white bg-cyan-700 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-500 rounded">Upload
                </Button>
            </div>
        </div>
    </div>
}