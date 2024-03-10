'use client'
import {PropsWithChildren, useState} from "react";
import {IoAdd} from "react-icons/io5";
import {Accordion, Button, Modal} from "flowbite-react";

type LFFormSectionProps = {
    sectionTitle: string; isGallery?: boolean; addElemButton?: boolean;
}
const HeadingClasses = "container mx-auto flex px-5 md:flex-row flex-col "
    + "text-2xl font-bold text-cyan-700 dark:text-white md:text-3xl lg:text-4xl";
const LFFormSection = ({children, sectionTitle, isGallery, addElemButton}: PropsWithChildren<LFFormSectionProps>) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className="pt-20">
            <Accordion>
                <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>
                        <h1 className="font-bold text-cyan-700 dark:text-white">
                            Add New Element
                        </h1>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setOpenModal(false)} className="dark:bg-cyan-50">Close</Button>
                    </Modal.Footer>
                </Modal>
                <Accordion.Panel>
                    <Accordion.Title>
                        <div className="flex items-center">
                            {addElemButton &&
                                <Button onClick={() => setOpenModal(true)} className="dark:bg-cyan-50">
                                    <IoAdd className="w-5 h-5 dark:text-cyan-800"/>
                                </Button>}
                            <p className={HeadingClasses}>
                                {sectionTitle}
                            </p>
                        </div>
                    </Accordion.Title>
                    <Accordion.Content>
                        <div
                            className={`container mx-auto flex px-5 py-14 w-full ${isGallery ? 'flex-wrap' : 'md:flex-row flex-col'}`}>
                            {children}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}
export default LFFormSection