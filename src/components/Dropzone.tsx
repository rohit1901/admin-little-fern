import {FileInput, Label} from 'flowbite-react';
import {getImageUrl, isEmailAuthorized} from "@admin/lib";
import Link from "next/link";
import {Fragment} from "react";
import {Popover} from "@admin/components/Popover";
import {HiMiniCloudArrowUp} from "react-icons/hi2";
import Image from "next/image";
import {useSession} from "next-auth/react";

type DropzoneProps = {
    imagePath?: string
}
const LabelClassName = "dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center " +
    "justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 " +
    "hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
const Dropzone = ({imagePath}: DropzoneProps) => {
    const {data: session} = useSession();
    return (<div className="flex w-full items-center justify-center">
        <Label
            htmlFor={`dropzone-file-${imagePath}`}
            className={LabelClassName}
        >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <HiMiniCloudArrowUp className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"/>
                {imagePath && <Fragment>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"> Click to view or hover to preview:</p>
                    <Popover
                        trigger="hover"
                        placement={"right"}
                        content={
                            <div
                                className="w-96 text-sm text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                <Image
                                    src={getImageUrl(imagePath)}
                                    width={800}
                                    height={400}
                                    className="col-span-2 h-full"
                                    alt="uploaded image"
                                />
                            </div>
                        }
                    >
                        <Link className="mb-2 text-sm dark:text-cyan-400 text-blue-500 hover:underline overflow-ellipsis"
                              href={getImageUrl(imagePath)} target="_blank">{imagePath} </Link>
                    </Popover>
                </Fragment>}
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Max. 800x400px)</p>
            </div>
            <FileInput disabled={!isEmailAuthorized(session)} id={`dropzone-file-${imagePath}`} className="hidden" onChange={(event) => {
                if (event.target.files?.length === 0) return;
                const file = event.target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                }
            }}/>
        </Label>
    </div>);
}
export default Dropzone;
