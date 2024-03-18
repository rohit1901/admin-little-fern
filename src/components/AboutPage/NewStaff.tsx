import LFFormElement from "@admin/components/LFFormElement";
import {Button, Checkbox, Label, Modal, Textarea, TextInput} from "flowbite-react";
import {ImageBlock} from "@admin/components/ImageBlock";
import {useEffect, useState} from "react";
import {StaffDetails} from "@admin/types";
import {useStaffStore} from "@admin/store/useStaffStore";
import {MdAddReaction} from "react-icons/md";
import {FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa";
import {ObjectId, WithId} from "mongodb";
import {API_STAFF_GET, API_STAFF_UPDATE} from "@admin/lib/constants";

const STAFF_IMAGE_FILENAME_PREFIX = "/images/stock/staff/staff-";
const STAFF_PORTRAIT_IMAGE_FILENAME_PREFIX = "/images/stock/about/about-team-";
const IMAGE_FILE_EXTENSION = ".jpg";

const buildStaffImageFilename = (index: number, isPortrait: boolean) => {
    // index should be 0-padded to 1 digit
    const paddedIndex = (index + 1).toString().padStart(2, '0')
    return `${isPortrait ? STAFF_PORTRAIT_IMAGE_FILENAME_PREFIX : STAFF_IMAGE_FILENAME_PREFIX}${paddedIndex}${IMAGE_FILE_EXTENSION}`
}
type NewStaffProps = {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}
const INITIAL_NEW_STAFF_DETAILS: StaffDetails = {
    name: "",
    role: "",
    description: "",
    featured: false,
    image: "",
    portraitImage: "",
    social: []
}
const areImagesUploaded = (staffImageUploaded: boolean, staffPortraitImageUploaded: boolean) => {
    return staffImageUploaded && staffPortraitImageUploaded
}
export const NewStaff = ({openModal, setOpenModal}: NewStaffProps) => {
    const [newStaffDetails, setNewStaffDetails] = useState<StaffDetails>(INITIAL_NEW_STAFF_DETAILS)
    const [id, setId] = useState<ObjectId>()
    const [staffImageUploaded, setStaffImageUploaded] = useState(false)
    const [staffPortraitImageUploaded, setStaffPortraitImageUploaded] = useState(false)
    const {staffDetails, setStaffDetails, setStaffAssurancesBlock, setHomeTextBlock, setAboutTextBlock} = useStaffStore()
    const addNewStaff = (staffDetails: WithId<StaffDetails>[]) => {
        if (!areImagesUploaded(staffImageUploaded, staffPortraitImageUploaded)) {
            alert("Please upload both images before adding new staff")
            return
        }
        const newStaff = [...staffDetails, newStaffDetails]
        fetch(API_STAFF_UPDATE, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                staffDetails: newStaff
            })
        }).then(r => r.json()).then((response) => {
            setStaffDetails(response.body)
        }).catch((error) => {
            console.error("Error adding new staff", error)
        }).finally(() => {
            setNewStaffDetails(INITIAL_NEW_STAFF_DETAILS)
            setOpenModal(false)
        })
    }
    useEffect(() => {
        if (!staffDetails || staffDetails?.length === 0) {
            fetch(API_STAFF_GET).then(r => r.json()).then((response) => {
                const staff = response.body
                setStaffDetails(staff?.staffDetails ?? [])
                setStaffAssurancesBlock(staff?.assurancesBlock ?? {})
                setHomeTextBlock(staff?.homeTextBlock ?? {})
                setAboutTextBlock(staff?.aboutTextBlock ?? {})
                setId(staff?._id)
            }).catch((error) => {
                console.error("Error fetching staff details", error)
            })
        }
    }, [])
    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>
                <div className="font-bold text-cyan-700 dark:text-white flex flex-row items-center">
                    <MdAddReaction/>
                    <div>Add New Staff</div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    addNewStaff(staffDetails)
                }}>
                    <div className="flex flex-row">
                        <div className="flex flex-col mr-2 w-1/2">
                            <LFFormElement labelValue="Staff name" labelName={`staffName`}
                                           elemValue={newStaffDetails.name}>
                                <TextInput id={`staffName`} type="text" placeholder="Staff name"
                                           value={newStaffDetails.name} required
                                           onChange={(event) =>
                                               setNewStaffDetails({...newStaffDetails, name: event.target.value})}/>
                            </LFFormElement>
                            <LFFormElement labelValue="Staff role" labelName={`staffRole`}
                                           elemValue={newStaffDetails.role}>
                                <TextInput id={`staffRole`} type="text" placeholder="Staff role"
                                           value={newStaffDetails.role} required
                                           onChange={(event) =>
                                               setNewStaffDetails({...newStaffDetails, role: event.target.value})}/>
                            </LFFormElement>
                            <LFFormElement labelValue="Staff description" labelName={`staffDescription`}
                                           elemValue={newStaffDetails.description}>
                                <Textarea id={`staffDescription`} placeholder="Staff description"
                                          value={newStaffDetails.description} required
                                          onChange={(event) =>
                                              setNewStaffDetails({...newStaffDetails, description: event.target.value})}/>
                            </LFFormElement>
                            <div className="flex pt-4">
                                <Checkbox id={`staffFeatured-`} checked={newStaffDetails.featured} className="mr-2"
                                          onChange={(event) =>
                                              setNewStaffDetails({...newStaffDetails, featured: event.target.checked})}/>
                                <Label htmlFor={`staffFeatured-`} className="flex" disabled>
                                    Show as Featured Staff on the homepage?
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <div className="mr-2">
                                <ImageBlock dropzone={false} imagePath={buildStaffImageFilename(staffDetails?.length, false)}
                                            label={"Staff Image"} afterUpload={() => {
                                    setStaffImageUploaded(true)
                                    setNewStaffDetails({...newStaffDetails, image: buildStaffImageFilename(staffDetails?.length, false)})
                                }}/>
                            </div>
                            <div className="mr-2">
                                <ImageBlock dropzone={false} imagePath={buildStaffImageFilename(staffDetails?.length, true)}
                                            label={"Staff Portrait Image"} afterUpload={() => {
                                    setStaffPortraitImageUploaded(true)
                                    setNewStaffDetails({...newStaffDetails, portraitImage: buildStaffImageFilename(staffDetails?.length, true)})
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex mr-2">
                            <LFFormElement labelValue="Facebook" labelName="facebook"
                                           elemValue={newStaffDetails.social[0]?.href ?? ""}>
                                <TextInput id="facebook" type="text" placeholder="Facebook"
                                           icon={FaFacebook}
                                           value={newStaffDetails.social[0]?.href ?? ""}
                                           onChange={(event) =>
                                               setNewStaffDetails({
                                                   ...newStaffDetails,
                                                   social: newStaffDetails.social.find((social) => social.name === "Facebook") ?
                                                       newStaffDetails.social.map((social) => social.name === "Facebook" ?
                                                           {name: "Facebook", href: event.target.value} : social) :
                                                       [...newStaffDetails.social, {name: "Facebook", href: event.target.value}]
                                               })}/>
                            </LFFormElement>
                        </div>
                        <div className="flex mr-2">
                            <LFFormElement labelValue="Instagram" labelName="instagram"
                                           elemValue={newStaffDetails.social[1]?.href ?? ""}>
                                <TextInput id="instagram" type="text" placeholder="Instagram"
                                           value={newStaffDetails.social[1]?.href ?? ""}
                                           icon={FaInstagram}
                                           onChange={(event) =>
                                               setNewStaffDetails({
                                                   ...newStaffDetails,
                                                   social: newStaffDetails.social.find((social) => social.name === "Instagram") ?
                                                       newStaffDetails.social.map((social) => social.name === "Instagram" ?
                                                           {name: "Instagram", href: event.target.value} : social) :
                                                       [...newStaffDetails.social, {name: "Instagram", href: event.target.value}]
                                               })}/>
                            </LFFormElement>
                        </div>
                        <div className="flex mr-2">
                            <LFFormElement labelValue="LinkedIn" labelName="linkedin"
                                           elemValue={newStaffDetails.social[2]?.href ?? ""}>
                                <TextInput id="linkedin" type="text" placeholder="LinkedIn"
                                           value={newStaffDetails.social[2]?.href ?? ""}
                                           icon={FaLinkedin}
                                           onChange={(event) =>
                                               setNewStaffDetails({
                                                   ...newStaffDetails,
                                                   social: newStaffDetails.social.find((social) => social.name === "LinkedIn") ?
                                                       newStaffDetails.social.map((social) => social.name === "LinkedIn" ?
                                                           {name: "LinkedIn", href: event.target.value} : social) :
                                                       [...newStaffDetails.social, {name: "LinkedIn", href: event.target.value}]
                                               })}/>
                            </LFFormElement>
                        </div>
                    </div>
                    <div className="flex flex-row w-1/4 justify-between mt-4">
                        <Button type="submit" className="dark:bg-cyan-50">Add</Button>
                        <Button onClick={() => setOpenModal(false)} className="dark:bg-cyan-50">Close</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}