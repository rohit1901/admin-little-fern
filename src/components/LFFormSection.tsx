import {PropsWithChildren} from "react";

type LFFormSectionProps = {
    sectionTitle: string;
    isGallery?: boolean;
}
const LFFormSection = ({children, sectionTitle, isGallery}: PropsWithChildren<LFFormSectionProps>) => {
    return (
        <div className="pt-20">
            <h1 className="container mx-auto flex px-5 md:flex-row flex-col w-full text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-cyan-800 dark:text-cyan-200">{sectionTitle}</span>
            </h1>
            <div
                className={`container mx-auto flex px-5 py-14 w-full ${isGallery ? 'flex-wrap' : 'md:flex-row flex-col'}`}>
                {children}
            </div>
        </div>
    )
}
export default LFFormSection