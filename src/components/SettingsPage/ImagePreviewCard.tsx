'use client'
import {Banner, Card} from "flowbite-react";
import {HiMiniInformationCircle} from "react-icons/hi2";
import Switch from "react-switch"
import {useSettingsStore} from "@admin/store/useSettingsStore";
import {LuImage, LuImageOff} from "react-icons/lu";

export const ImagePreviewCard = () => {
    const {imagePreviews, setImagePreviews} = useSettingsStore()
    return <Card className="max-w-sm dark:border-primary-50">
        <h5 className="text-2xl font-bold tracking-tight text-cyan-800 dark:text-cyan-50">
            {imagePreviews ? <LuImage/> : <LuImageOff/>}
            <div className='flex flex-wrap items-center'>
                <p>Toggle Image Previews</p>
            </div>

        </h5>
        <p className="font-normal text-cyan-700 dark:text-cyan-50">
            This will toggle the image previews above the dropzones.
            Image previews show the images which have been uploaded to the website.
        </p>
        <Banner
            className="flex justify-between items-center rounded border-b border-gray-200 bg-gray-50 dark:border-cyan-50 dark:bg-cyan-50 p-2">
            <HiMiniInformationCircle className="mr-2 h-5 w-5 text-cyan-800"/>
            <p className="font-mono text-xs text-cyan-800">Image previews are enabled by default.</p>
        </Banner>
        <div className="flex flex-row justify-between mt-4 text-cyan-800 dark:text-cyan-50 items-center">
            <label htmlFor="toggle-image-switch" className="mx-2 text-xs">Show Image previews above the Dropzones on the website?</label>
            <Switch
                id="toggle-image-switch"
                onColor="#155"
                checked={imagePreviews}
                onChange={(checked) => {
                    setImagePreviews(checked)
                }}/>
        </div>
    </Card>
}