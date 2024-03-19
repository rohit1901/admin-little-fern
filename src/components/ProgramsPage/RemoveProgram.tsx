import {useEffect, useState} from "react";
import {ObjectId, WithId} from "mongodb";
import {useSchoolProgramsPageStore} from "@admin/store";
import {API_PROGRAMS_GET, API_PROGRAMS_UPDATE} from "@admin/lib/constants";
import {SchoolProgramsBlock} from "@admin/types";
import {Button, Checkbox, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table} from "flowbite-react";
import {MdOutlineFolderDelete} from "react-icons/md";

type RemoveProgramProps = {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}
export const RemoveProgram = ({openModal, setOpenModal}: RemoveProgramProps) => {
    const [loading, setLoading] = useState(false)
    const [selectedProgramId, setSelectedProgramId] = useState<ObjectId>()
    const [collectionId, setCollectionId] = useState<ObjectId>()
    const {programs, setPrograms, setHeading} = useSchoolProgramsPageStore()
    const fetchProgramsCallback = (programsBlock: WithId<SchoolProgramsBlock>) => {
        setCollectionId(programsBlock._id)
        setPrograms(programsBlock?.schoolPrograms ?? [])
        setHeading(programsBlock?.heading ?? '')
    }
    useEffect(() => {
        if (!programs || programs?.length === 0) {
            fetch(API_PROGRAMS_GET).then(r => r.json()).then((response) => {
                const programsBlock: WithId<SchoolProgramsBlock> = response.body
                fetchProgramsCallback(programsBlock)
            }).catch((error) => {
                console.error("Error fetching programs", error)
            })
        }
    }, [])
    if (!programs || programs.length === 0) return null
    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="sm">
            <ModalHeader>
                <div className="font-bold text-cyan-700 dark:text-white flex flex-row items-center">
                    <MdOutlineFolderDelete size="25"/>
                    <span className="ml-2">Remove Program</span>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="mx-auto">
                    <Table hoverable striped>
                        <Table.Head className="text-cyan-800 dark:text-cyan-50">
                            <Table.HeadCell className="p-4"/>
                            <Table.HeadCell>Program Name</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y text-cyan-800 dark:text-cyan-50">
                            {programs?.map(({name, _id}) => (
                                <Table.Row key={_id.toString()}
                                           className={!!selectedProgramId && selectedProgramId !== _id ? 'cursor-not-allowed' : 'cursor-pointer'}>
                                    <Table.Cell className="p-4">
                                        {/* on checked, all other checkboxes should be disabled and vice versa */}
                                        <Checkbox id={`program-${_id.toString()}`} onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedProgramId(_id)
                                            } else {
                                                setSelectedProgramId(undefined)
                                            }
                                        }} disabled={!!selectedProgramId && selectedProgramId !== _id}
                                                  className={!!selectedProgramId && selectedProgramId !== _id ?
                                                      'cursor-not-allowed' : 'cursor-pointer'}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {name}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setOpenModal(false)} className="mr-1">
                    Cancel
                </Button>
                <Button onClick={async () => {
                    setLoading(true)
                    fetch(API_PROGRAMS_UPDATE, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({_id: selectedProgramId, collectionId})
                    }).then(r => {
                        if (r.ok) {
                            fetch(API_PROGRAMS_GET).then(r => r.json()).then((response) => {
                                const programsBlock: WithId<SchoolProgramsBlock> = response.body
                                fetchProgramsCallback(programsBlock)
                            }).catch((error) => {
                                console.error("Error fetching programs", error)
                            })
                        }
                    }).catch((error) => {
                        console.error("Error removing program", error)
                        setLoading(false)
                    }).finally(() => {
                        setSelectedProgramId(undefined)
                        setLoading(false)
                        setOpenModal(false)
                    })
                }} disabled={!selectedProgramId} color="failure">
                    {loading ? <Spinner size="sm"/> : <span className="text-white">Remove</span>}
                </Button>
            </ModalFooter>
        </Modal>
    )
}