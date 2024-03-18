'use client'
import {PropsWithChildren, useState} from "react";
import {Accordion} from "flowbite-react";

type LFFormSectionProps = {
    sectionTitle: string;
    wrap?: boolean;
    row?: boolean;
    column?: boolean;
    addElemButton?: boolean;
}
const HeadingClasses = "container mx-auto flex px-5 md:flex-row flex-col "
    + "text-2xl font-bold text-cyan-800 dark:text-cyan-50";
const getDisplayClasses = (wrap?: boolean, row?: boolean, column?: boolean) => {
    if (row) return 'flex-row'
    if (column) return 'flex-col'
    return 'flex-wrap'
}
const LFFormSection = ({children, sectionTitle, wrap, row, column}: PropsWithChildren<LFFormSectionProps>) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <Accordion className="mb-5">
            <Accordion.Panel>
                <Accordion.Title>
                    <p className={HeadingClasses}>
                        {sectionTitle}
                    </p>
                </Accordion.Title>
                <Accordion.Content>
                    <div
                        className={`container mx-auto flex px-5 w-full ${getDisplayClasses(wrap, row, column)}`}>
                        {children}
                    </div>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    )
}
export default LFFormSection