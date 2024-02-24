import {PropsWithChildren} from "react";

type LFFormSectionProps = {
    sectionTitle: string;
}
const LFFormSection = ({children, sectionTitle}: PropsWithChildren<LFFormSectionProps>) => {
    return (
        <div className='pt-2 pb-4'>
            <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">{sectionTitle}</span>
            </h1>
            <section className="grid grid-cols-2 gap-4">
                {children}
            </section>
        </div>
    )
}
export default LFFormSection