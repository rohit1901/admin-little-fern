import {PropsWithChildren} from "react";

type LFFormSectionProps = {
    sectionTitle: string;
    isGallery?: boolean;
}
const LFFormSection = ({children, sectionTitle, isGallery}: PropsWithChildren<LFFormSectionProps>) => {
    return (
        <div className="pt-20">
            <h1 className="container mx-auto flex px-5 md:flex-row flex-col w-full text-2xl font-bold text-cyan-700 dark:text-white md:text-3xl lg:text-4xl">
                {sectionTitle}
            </h1>
            <div
                className={`container mx-auto flex px-5 py-14 w-full ${isGallery ? 'flex-wrap' : 'md:flex-row flex-col'}`}>
                {children}
            </div>
        </div>
    )
}
export default LFFormSection