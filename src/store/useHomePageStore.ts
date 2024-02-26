import {create} from 'zustand';
import {Hero, HomeFeatureBlock, HomePageData, SchoolProgram, StaffDescription, StaffDetails} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

type State = {
    homePageData: WithId<HomePageData>;
    setHomePageData: (data: WithId<HomePageData>) => void;
    setHomePageHeroTagline: (tagline: string) => void;
    setHomePageHeroHeadline: (headline: string) => void;
    setHomePageHeroText: (text: string) => void;
    setYouTubeLink: (link: string) => void;
    setSchoolFeaturesHeading: (heading: string) => void;
    setSchoolFeaturesSubHeading: (subHeading: string) => void;
    setSchoolFeaturesFeatures: (features: string) => void;
    setSchoolFeaturesFeatureBlocks: (featureBlocks: WithId<HomeFeatureBlock>[]) => void;
    setFeatureTagline: (id: ObjectId, tagline: string) => void;
    setFeatureHeadline: (id: ObjectId, headline: string) => void;
    setFeatureText: (id: ObjectId, text: string) => void;
    setFeaturedStaffName: (id: ObjectId, name: string) => void;
    setFeaturedStaffDescription: (id: ObjectId, description: string) => void;
    setStaffDetailsName: (id: ObjectId, name: string) => void;
    setStaffDetailsRole: (id: ObjectId, role: string) => void;
    setStaffAssurancesBlockHeading: (heading: string) => void;
    setStaffAssurancesBlockAssurances: (assurances: string) => void;
    setSchoolProgramsHeading: (heading: string) => void;
    setSchoolProgramHeroTagline: (id: ObjectId, tagline: string) => void;
    setSchoolProgramHeroHeadline: (id: ObjectId, headline: string) => void;
    setSchoolProgramHeroText: (id: ObjectId, text: string) => void;
};

export const useHomePageStore = create<State>((set) => ({
    homePageData: {} as WithId<HomePageData>,
    newFeatureBlocks: [] as WithId<HomeFeatureBlock>[],
    setHomePageData: (data: WithId<HomePageData>) => set(state => {
        return {homePageData: data}
    }),
    setHomePageHeroTagline: (tagline: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            homeHero: {...state.homePageData.homeHero, hero: {...state.homePageData.homeHero.hero, tagline: tagline}}
        }
    })),
    setHomePageHeroHeadline: (headline: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            homeHero: {...state.homePageData.homeHero, hero: {...state.homePageData.homeHero.hero, headline: headline}}
        }
    })),
    setHomePageHeroText: (text: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            homeHero: {...state.homePageData.homeHero, hero: {...state.homePageData.homeHero.hero, text: text}}
        },
    })),
    setYouTubeLink: (link: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            homeHero: {...state.homePageData.homeHero, hero: {...state.homePageData.homeHero.hero, youTubeLink: link}}
        }
    })),
    setSchoolFeaturesHeading: (heading: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            schoolFeatures: {...state.homePageData.schoolFeatures, heading: heading}
        }
    })),
    setSchoolFeaturesSubHeading: (subHeading: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            schoolFeatures: {...state.homePageData.schoolFeatures, subHeading: subHeading}
        }
    })),
    setSchoolFeaturesFeatures: (features: string) => set((state) => {
        //split the string into an array of strings by comma
        const featuresArray = features.split(',')
        return {
            homePageData: {
                ...state.homePageData,
                schoolFeatures: {...state.homePageData.schoolFeatures, features: featuresArray}
            }
        }
    }),
    setSchoolFeaturesFeatureBlocks: (featureBlocks: WithId<HomeFeatureBlock>[]) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            schoolFeatures: {...state.homePageData.schoolFeatures, featureBlocks: featureBlocks}
        }
    })),
    setFeatureTagline: (id: ObjectId, tagline: string) => set((state) => {
        const nFeatureBlock: WithId<HomeFeatureBlock> | undefined = state.homePageData.schoolFeatures?.featureBlocks?.find((block) => block._id.toString() === id.toString())
        if (!nFeatureBlock) return state
        const newFeatureBlock: WithId<HomeFeatureBlock> = {...nFeatureBlock, tagline: tagline}
        const newFeatureBlocks = state.homePageData.schoolFeatures?.featureBlocks?.map((block) => {
            if (block._id === nFeatureBlock?._id) {
                return newFeatureBlock
            }
            return block
        })
        if (!newFeatureBlocks) return state
        return {
            homePageData: {
                ...state.homePageData,
                schoolFeatures: {...state.homePageData.schoolFeatures, featureBlocks: newFeatureBlocks}
            }
        }
    }),
    setFeatureHeadline: (id: ObjectId, headline: string) => set((state) => {
        const nFeatureBlock: WithId<HomeFeatureBlock> | undefined = state.homePageData.schoolFeatures?.featureBlocks?.find((block) => block._id.toString() === id.toString())
        if (!nFeatureBlock) return state
        const newFeatureBlock: WithId<HomeFeatureBlock> = {...nFeatureBlock, headline: headline}
        const newFeatureBlocks = state.homePageData.schoolFeatures?.featureBlocks?.map((block) => {
            if (block._id === nFeatureBlock?._id) {
                return newFeatureBlock
            }
            return block
        })
        if (!newFeatureBlocks) return state
        return {
            homePageData: {
                ...state.homePageData,
                schoolFeatures: {...state.homePageData.schoolFeatures, featureBlocks: newFeatureBlocks}
            }
        }
    }),
    setFeatureText: (id: ObjectId, text: string) => set((state) => {
        const nFeatureBlock: WithId<HomeFeatureBlock> | undefined = state.homePageData.schoolFeatures?.featureBlocks?.find((block) => block._id.toString() === id.toString())
        if (!nFeatureBlock) return state
        const newFeatureBlock: WithId<HomeFeatureBlock> = {...nFeatureBlock, text: text}
        const newFeatureBlocks = state.homePageData.schoolFeatures?.featureBlocks?.map((block) => {
            if (block._id === nFeatureBlock?._id) {
                return newFeatureBlock
            }
            return block
        })
        if (!newFeatureBlocks) return state
        return {
            homePageData: {
                ...state.homePageData,
                schoolFeatures: {...state.homePageData.schoolFeatures, featureBlocks: newFeatureBlocks}
            }
        }
    }),
    setFeaturedStaffName: (id: ObjectId, name: string) => set((state) => {
        const nStaff: WithId<StaffDescription> | undefined = state.homePageData.staff?.featuredStaffDescription?.find((staff) => staff._id.toString() === id.toString())
        if (!nStaff) return state
        const newStaff: WithId<StaffDescription> = {...nStaff, name: name}
        const newStaffDetails = state.homePageData.staff?.featuredStaffDescription?.map((staff) => {
            if (staff._id === nStaff?._id) {
                return newStaff
            }
            return staff
        })
        if (!newStaffDetails) return state
        return {
            homePageData: {
                ...state.homePageData,
                staff: {...state.homePageData.staff, featuredStaffDescription: newStaffDetails}
            }
        }
    }),
    setFeaturedStaffDescription: (id: ObjectId, description: string) => set((state) => {
        const nStaff: WithId<StaffDescription> | undefined = state.homePageData.staff?.featuredStaffDescription?.find((staff) => staff._id.toString() === id.toString())
        if (!nStaff) return state
        const newStaff: WithId<StaffDescription> = {...nStaff, description: description}
        const newStaffDetails = state.homePageData.staff?.featuredStaffDescription?.map((staff) => {
            if (staff._id === nStaff?._id) {
                return newStaff
            }
            return staff
        })
        if (!newStaffDetails) return state
        return {
            homePageData: {
                ...state.homePageData,
                staff: {...state.homePageData.staff, featuredStaffDescription: newStaffDetails}
            }
        }
    }),
    setStaffDetailsName: (id: ObjectId, name: string) => set((state) => {
        const nStaff: WithId<StaffDetails> | undefined = state.homePageData.staff?.staffDetails?.find((staff) => staff._id.toString() === id.toString())
        if (!nStaff) return state
        const newStaff: WithId<StaffDetails> = {...nStaff, name: name}
        const newStaffDetails = state.homePageData.staff?.staffDetails?.map((staff) => {
            if (staff._id === nStaff?._id) {
                return newStaff
            }
            return staff
        })
        if (!newStaffDetails) return state
        return {
            homePageData: {
                ...state.homePageData,
                staff: {...state.homePageData.staff, staffDetails: newStaffDetails}
            }
        }
    }),
    setStaffDetailsRole: (id: ObjectId, role: string) => set((state) => {
        const nStaff: WithId<StaffDetails> | undefined = state.homePageData.staff?.staffDetails?.find((staff) => staff._id.toString() === id.toString())
        if (!nStaff) return state
        const newStaff: WithId<StaffDetails> = {...nStaff, role: role}
        const newStaffDetails = state.homePageData.staff?.staffDetails?.map((staff) => {
            if (staff._id === nStaff?._id) {
                return newStaff
            }
            return staff
        })
        if (!newStaffDetails) return state
        return {
            homePageData: {
                ...state.homePageData,
                staff: {...state.homePageData.staff, staffDetails: newStaffDetails}
            }
        }
    }),
    setStaffAssurancesBlockHeading: (heading: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            staff: {
                ...state.homePageData.staff,
                assurancesBlock: {...state.homePageData.staff.assurancesBlock, heading: heading}
            }
        }
    })),
    setStaffAssurancesBlockAssurances: (assurances: string) => set((state) => {
        //split the string into an array of strings by comma
        const newAssurances = assurances.split(',')
        return {
            homePageData: {
                ...state.homePageData,
                staff: {
                    ...state.homePageData.staff,
                    assurancesBlock: {...state.homePageData.staff.assurancesBlock, assurances: newAssurances}
                }
            }
        }
    }),
    setSchoolProgramsHeading: (heading: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            schoolProgramsBlock: {...state.homePageData.schoolProgramsBlock, heading: heading}
        }
    })),
    setSchoolProgramHeroTagline: (id: ObjectId, tagline: string) => set((state) => {
        // find the hero block with the id of schoolPrograms in the schoolProgramsBlock
        const newProgram: WithId<SchoolProgram> | undefined = state.homePageData.schoolProgramsBlock?.schoolPrograms?.find((hero) => hero._id.toString() === id.toString())
        if (!newProgram) return state
        const newHero: Hero = {...newProgram.hero, tagline: tagline}
        // create the new schoolPrograms array with the updated hero block
        const newSchoolPrograms = state.homePageData.schoolProgramsBlock?.schoolPrograms?.map((program) => {
            if (program._id?.toString() === id.toString()) {
                return {...program, hero: newHero}
            }
            return {...program}
        })
        if (!newSchoolPrograms) return state
        return {
            homePageData: {
                ...state.homePageData,
                schoolProgramsBlock: {...state.homePageData.schoolProgramsBlock, schoolPrograms: newSchoolPrograms}
            }
        }
    }),
    setSchoolProgramHeroHeadline: (id: ObjectId, headline: string) => set((state) => {
        // find the hero block with the id of schoolPrograms in the schoolProgramsBlock
        const newProgram: WithId<SchoolProgram> | undefined = state.homePageData.schoolProgramsBlock?.schoolPrograms?.find((hero) => hero._id.toString() === id.toString())
        if (!newProgram) return state
        const newHero: Hero = {...newProgram.hero, headline: headline}
        // create the new schoolPrograms array with the updated hero block
        const newSchoolPrograms = state.homePageData.schoolProgramsBlock?.schoolPrograms?.map((program) => {
            if (program._id?.toString() === id.toString()) {
                return {...program, hero: newHero}
            }
            return {...program}
        })
        if (!newSchoolPrograms) return state
        return {
            homePageData: {
                ...state.homePageData,
                schoolProgramsBlock: {...state.homePageData.schoolProgramsBlock, schoolPrograms: newSchoolPrograms}
            }
        }
    }),
    setSchoolProgramHeroText: (id: ObjectId, text: string) => set((state) => {
        // find the hero block with the id of schoolPrograms in the schoolProgramsBlock
        const newProgram: WithId<SchoolProgram> | undefined = state.homePageData.schoolProgramsBlock?.schoolPrograms?.find((hero) => hero._id.toString() === id.toString())
        if (!newProgram) return state
        const newHero: Hero = {...newProgram.hero, text: text}
        // create the new schoolPrograms array with the updated hero block
        const newSchoolPrograms = state.homePageData.schoolProgramsBlock?.schoolPrograms?.map((program) => {
            if (program._id?.toString() === id.toString()) {
                return {...program, hero: newHero}
            }
            return {...program}
        })
        if (!newSchoolPrograms) return state
        return {
            homePageData: {
                ...state.homePageData,
                schoolProgramsBlock: {...state.homePageData.schoolProgramsBlock, schoolPrograms: newSchoolPrograms}
            }
        }
    }),
}));