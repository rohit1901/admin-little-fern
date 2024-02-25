import {PropsWithChildren} from "react";

type LFFormSectionProps = {
    sectionTitle: string;
}
const LFFormSection = ({children, sectionTitle}: PropsWithChildren<LFFormSectionProps>) => {
    return (
        <div className='py-8'>
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    <span
                        className="text-transparent bg-clip-text bg-cyan-800 dark:text-cyan-200">{sectionTitle}</span>
            </h1>
            <section className="grid grid-cols-2 gap-4">
                {children}
            </section>
        </div>
    )
}
export default LFFormSection