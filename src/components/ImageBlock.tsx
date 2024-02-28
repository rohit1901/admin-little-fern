import {ChangeEvent, Fragment} from "react";
import Image from "next/image";
import Dropzone from "@admin/components/Dropzone";
import {Textarea} from "flowbite-react";
import {getImageUrl} from "@admin/lib";
type ImageBlockProps = {
    textArea?: string
    imagePath?: string
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
export const ImageBlock = ({textArea, imagePath, onChange}: ImageBlockProps) => {
    return <Fragment>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <div className="container px-5 py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                    {imagePath && <div className="rounded-lg h-64 overflow-hidden">
                        <Image alt="content" width={1200} height={500}
                               className="object-cover object-center h-full w-full"
                               src={getImageUrl(imagePath)}/>
                    </div>}
                    <div className="flex flex-col sm:flex-row mt-10">
                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <Dropzone imagePath={imagePath} withPopover/>
                        </div>
                        <div
                            className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            {textArea &&
                                <Textarea id="text" placeholder="Text for the Hero Block"
                                          className="leading-relaxed mb-4 h-full"
                                          value={textArea} required
                                          onChange={onChange}/>
                            }
                            <a className="text-indigo-500 inline-flex items-center">Learn More
                                <svg fill="none" stroke="currentColor" stroke-linecap="round"
                                     stroke-linejoin="round"
                                     stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}