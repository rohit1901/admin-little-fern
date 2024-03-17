'use client'
import {Fragment, PropsWithChildren, useState} from "react";
import {Accordion, Button, Modal} from "flowbite-react";
import {MdOutlineAddReaction} from "react-icons/md";
import {NewStaff} from "@admin/components/AboutPage/NewStaff";

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
const LFFormSection = ({children, sectionTitle, wrap, row, column, addElemButton}: PropsWithChildren<LFFormSectionProps>) => {
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
                    {addElemButton &&
                        <Fragment>
                            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="4-xl">
                                <Modal.Header>
                                    <h1 className="font-bold text-cyan-700 dark:text-white">
                                        Add New {sectionTitle}
                                    </h1>
                                </Modal.Header>
                                <Modal.Body>
                                    <NewStaff/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => setOpenModal(false)} className="dark:bg-cyan-50">Close</Button>
                                </Modal.Footer>
                            </Modal>
                            <Button onClick={() => setOpenModal(true)} outline>
                                <MdOutlineAddReaction className="w-5 h-5 mr-2 dark:text-cyan-800"/>
                                <p>Add new Staff</p>
                            </Button>
                        </Fragment>
                    }
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