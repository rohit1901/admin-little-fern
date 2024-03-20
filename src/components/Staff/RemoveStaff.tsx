import {Button, Checkbox, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Table} from "flowbite-react";
import {useStaffStore} from "@admin/store/useStaffStore";
import {useEffect, useState} from "react";
import {API_STAFF_GET, API_STAFF_UPDATE} from "@admin/lib/constants";
import {ObjectId, WithId} from "mongodb";
import {StaffPageData} from "@admin/types";
import {RiEmotionSadLine} from "react-icons/ri";

type RemoveStaffProps = {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}
export const RemoveStaff = ({openModal, setOpenModal}: RemoveStaffProps) => {
    const {staffDetails, staffPageDataId, setStaffPageDataId, setStaffDetails} = useStaffStore()
    const [selectedStaff, setSelectedStaff] = useState<ObjectId>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!staffDetails || staffDetails?.length === 0) {
            fetch(API_STAFF_GET).then(r => r.json()).then((response) => {
                const staff: WithId<StaffPageData> = response.body
                setStaffPageDataId(staff?._id)
                setStaffDetails(staff?.staffDetails ?? [])
            }).catch((error) => {
                console.error("Error fetching staff details", error)
            })
        }
    }, [])
    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="sm">
            <ModalHeader>
                <div className="font-bold text-cyan-700 dark:text-white flex flex-row items-center">
                    <RiEmotionSadLine size="25"/>
                    <span className="ml-2">Remove Staff</span>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="mx-auto">
                    <Table hoverable striped>
                        <Table.Head className="text-cyan-800 dark:text-cyan-50">
                            <Table.HeadCell className="p-4"/>
                            <Table.HeadCell>Staff Name</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y text-cyan-800 dark:text-cyan-50">
                            {staffDetails?.map(({name, _id}) => {
                                return (
                                    <Table.Row key={_id.toString()}
                                               className={!!selectedStaff && selectedStaff !== _id ? 'cursor-not-allowed' : 'cursor-pointer'}>
                                        <Table.Cell className="p-4">
                                            {/* on checked, all other checkboxes should be disabled and vice versa */}
                                            <Checkbox id={`staff-${_id.toString()}`} onChange={(event) => {
                                                if (event.target.checked) {
                                                    setSelectedStaff(_id)
                                                } else {
                                                    setSelectedStaff(undefined)
                                                }
                                            }} disabled={!!selectedStaff && selectedStaff !== _id}
                                                      className={!!selectedStaff && selectedStaff !== _id ? 'cursor-not-allowed' : 'cursor-pointer'}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {name}
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                <Button onClick={async () => {
                    setLoading(true)
                    await fetch(API_STAFF_UPDATE, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            _id: staffPageDataId,
                            staffDetailId: selectedStaff
                        })
                    }).catch((error) => {
                        console.error("Error fetching staff details", error)
                    }).finally(() => {
                        setLoading(false)
                        setOpenModal(false)
                    })
                }} color="failure" disabled={selectedStaff === undefined}>
                    {loading ? <Spinner size="sm"/> : <span className="text-white">Remove</span>}
                </Button>
            </ModalFooter>
        </Modal>
    )
}