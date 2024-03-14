import {StaffAssurancesBlock, StaffDetails, TextBlock} from "@admin/types";
import {WithId} from "mongodb";
import {create} from "zustand";

const defaultTextBlock: TextBlock = {
    headline: '',
    text: '',
    subHeading: ''
}
type StaffStore = {
    staffDetails: WithId<StaffDetails>[]
    staffAssurancesBlock: StaffAssurancesBlock
    homeTextBlock: TextBlock
    aboutTextBlock: TextBlock
    setStaffDetails: (staffDetails: WithId<StaffDetails>[]) => void
    setStaffDetailsName: (id: string, name: string) => void
    setStaffDetailsRole: (id: string, role: string) => void
    setStaffDetailsFeatured: (id: string, featured: boolean) => void
    setStaffDetailsDescription: (id: string, description: string) => void
    setStaffAssurancesBlock: (staffAssurancesBlock: StaffAssurancesBlock) => void
    setStaffAssurancesBlockHeading: (heading: string) => void;
    setStaffAssurancesBlockAssurances: (assurances: string) => void;
    setHomeTextBlock: (homeTextBlock: TextBlock) => void
    setHomeTextHeadline: (headline: string) => void
    setHomePageText: (text: string) => void
    setHomeSubHeading: (subHeading?: string) => void
    setAboutTextBlock: (aboutTextBlock: TextBlock) => void
    setAboutTextHeadline: (headline: string) => void
    setAboutTextText: (text: string) => void
    setAboutSubHeading: (subHeading?: string) => void
}
export const useStaffStore = create<StaffStore>((set) => ({
    staffDetails: [] as WithId<StaffDetails>[],
    staffAssurancesBlock: {} as StaffAssurancesBlock,
    homeTextBlock: defaultTextBlock,
    aboutTextBlock: defaultTextBlock,
    setStaffDetails: (staffDetails: WithId<StaffDetails>[]) => set({staffDetails}),
    setStaffDetailsName: (id: string, name: string) => set((state) => ({
        staffDetails: state.staffDetails.map((staff) => {
            if (staff._id.toString() === id) {
                return {...staff, name: name}
            }
            return staff
        })
    })),
    setStaffDetailsRole: (id: string, role: string) => set((state) => ({
        staffDetails: state.staffDetails.map((staff) => {
            if (staff._id.toString() === id) {
                return {...staff, role: role}
            }
            return staff
        })
    })),
    setStaffDetailsFeatured: (id: string, featured: boolean) => set((state) => ({
        staffDetails: state.staffDetails.map((staff) => {
            if (staff._id.toString() === id) {
                return {...staff, featured: featured}
            }
            return staff
        })
    })),
    setStaffDetailsDescription: (id: string, description: string) => set((state) => ({
        staffDetails: state.staffDetails.map((staff) => {
            if (staff._id.toString() === id) {
                return {...staff, description: description}
            }
            return staff
        })
    })),
    setStaffAssurancesBlock: (staffAssurancesBlock: StaffAssurancesBlock) => set({staffAssurancesBlock}),
    setStaffAssurancesBlockHeading: (heading: string) => set((state) => ({
        staffAssurancesBlock: {...state.staffAssurancesBlock, heading: heading}
    })),
    setStaffAssurancesBlockAssurances: (assurances: string) => set((state) => {
        //split the string into an array of strings by comma
        const newAssurances = assurances.split(',')
        return {
            staffAssurancesBlock: {...state.staffAssurancesBlock, assurances: newAssurances}
        }
    }),
    setHomeTextBlock: (homeTextBlock: TextBlock) => set({homeTextBlock}),
    setHomeTextHeadline: (headline: string) => set((state) => ({
        homeTextBlock: {...state.homeTextBlock, headline: headline}
    })),
    setHomePageText: (text: string) => set((state) => ({
        homeTextBlock: {...state.homeTextBlock, text: text}
    })),
    setHomeSubHeading: (subHeading?: string) => set((state) => ({
        homeTextBlock: {...state.homeTextBlock, subHeading: subHeading}
    })),
    setAboutTextBlock: (aboutTextBlock: TextBlock) => set({aboutTextBlock}),
    setAboutTextHeadline: (headline: string) => set((state) => ({
        aboutTextBlock: {...state.aboutTextBlock, headline: headline}
    })),
    setAboutTextText: (text: string) => set((state) => ({
        aboutTextBlock: {...state.aboutTextBlock, text: text}
    })),
    setAboutSubHeading: (subHeading?: string) => set((state) => ({
        aboutTextBlock: {...state.aboutTextBlock, subHeading: subHeading}
    }))
}))