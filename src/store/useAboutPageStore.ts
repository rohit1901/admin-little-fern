import {AboutPageData} from "@admin/types";
import {create} from "zustand";
import {WithId} from "mongodb";

type AboutPageStore = {
    aboutPageData: WithId<AboutPageData>,
    setAboutPageData: (data: WithId<AboutPageData>) => void,
    setDescription: (description: string) => void,
    setTitle: (title: string) => void,
    setSubTitle: (subTitle: string) => void,
    setParagraph: (paragraph: string) => void,
    setAlternatingFeaturesTitle: (title: string) => void,
    setAlternatingFeaturesUnderlinedText: (underlinedText: string) => void,
    setAFBlockTagline: (id: string, tagline: string) => void,
    setAFBlockHeadline: (id: string, headline: string) => void,
    setAFBlockText: (id: string, text: string) => void,
    setStatsBlockHeading: (heading: string) => void,
    setStatsBlockSubHeading: (subHeading: string) => void,
    setStatsBlockStatLabel: (id: string, label: string) => void,
    setStatsBlockStatValue: (id: string, value: string) => void,
    setStaffBlockHeading: (heading: string) => void,
    setStaffBlockSubHeading: (subHeading: string) => void,
    setStaffBlockName: (id: string, name: string) => void,
    setStaffBlockRole: (id: string, role: string) => void,
    setValueDataHeading: (heading: string) => void,
    setValueDataSubHeading: (subHeading: string) => void,
    setValueDataValue: (id: string, value: string) => void,
    setValueDataDescription: (id: string, description: string) => void,
}
export const useAboutPageStore = create<AboutPageStore>((set) => ({
    aboutPageData: {} as WithId<AboutPageData>,
    setAboutPageData: (data: WithId<AboutPageData>) => set({aboutPageData: data}),
    setDescription: (description: string) => set((state) => ({aboutPageData: {...state.aboutPageData, description}})),
    setTitle: (title: string) => set((state) => ({aboutPageData: {...state.aboutPageData, title}})),
    setSubTitle: (subTitle: string) => set((state) => ({aboutPageData: {...state.aboutPageData, subTitle}})),
    setParagraph: (paragraph: string) => set((state) => ({aboutPageData: {...state.aboutPageData, paragraph}})),
    setAlternatingFeaturesTitle: (title: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            alternatingFeatures: {...state.aboutPageData.alternatingFeatures, sectionTitle: title}
        }
    })),
    setAlternatingFeaturesUnderlinedText: (underlinedText: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            alternatingFeatures: {...state.aboutPageData.alternatingFeatures, underlinedText}
        }
    })),
    setAFBlockTagline: (id: string, tagline: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            alternatingFeatures: {
                ...state.aboutPageData.alternatingFeatures,
                blocks: state.aboutPageData.alternatingFeatures.blocks.map((block) => {
                    if (block._id.toString() === id) {
                        return {...block, tagline}
                    }
                    return block
                })
            }
        }
    })),
    setAFBlockHeadline: (id: string, headline: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            alternatingFeatures: {
                ...state.aboutPageData.alternatingFeatures,
                blocks: state.aboutPageData.alternatingFeatures.blocks.map((block) => {
                    if (block._id.toString() === id) {
                        return {...block, headline}
                    }
                    return block
                })
            }
        }
    })),
    setAFBlockText: (id: string, text: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            alternatingFeatures: {
                ...state.aboutPageData.alternatingFeatures,
                blocks: state.aboutPageData.alternatingFeatures.blocks.map((block) => {
                    if (block._id.toString() === id) {
                        return {...block, text}
                    }
                    return block
                })
            }
        }
    })),
    setStatsBlockHeading: (heading: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            statsBlock: {...state.aboutPageData.statsBlock, heading}
        }
    })),
    setStatsBlockSubHeading: (subHeading: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            statsBlock: {...state.aboutPageData.statsBlock, subHeading}
        }
    })),
    setStatsBlockStatLabel: (id: string, label: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            statsBlock: {
                ...state.aboutPageData.statsBlock,
                stats: state.aboutPageData.statsBlock.stats.map((stat) => {
                    if (stat._id.toString() === id) {
                        return {...stat, label}
                    }
                    return stat
                })
            }
        }
    })),
    setStatsBlockStatValue: (id: string, value: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            statsBlock: {
                ...state.aboutPageData.statsBlock,
                stats: state.aboutPageData.statsBlock.stats.map((stat) => {
                    if (stat._id.toString() === id) {
                        return {...stat, value}
                    }
                    return stat
                })
            }
        }
    })),
    setStaffBlockHeading: (heading: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            staffBlock: {...state.aboutPageData.staffBlock, heading}
        }
    })),
    setStaffBlockSubHeading: (subHeading: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            staffBlock: {...state.aboutPageData.staffBlock, subHeading}
        }
    })),
    setStaffBlockName: (id: string, name: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            staffBlock: {
                ...state.aboutPageData.staffBlock,
                staffDetails: state.aboutPageData.staffBlock.staffDetails.map((staff) => {
                    if (staff._id.toString() === id) {
                        return {...staff, name}
                    }
                    return staff
                })
            }
        }
    })),
    setStaffBlockRole: (id: string, role: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            staffBlock: {
                ...state.aboutPageData.staffBlock,
                staffDetails: state.aboutPageData.staffBlock.staffDetails.map((staff) => {
                    if (staff._id.toString() === id) {
                        return {...staff, role}
                    }
                    return staff
                })
            }
        }
    })),
    setValueDataHeading: (heading: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            valueData: {...state.aboutPageData.valueData, heading}
        }
    })),
    setValueDataSubHeading: (subHeading: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            valueData: {...state.aboutPageData.valueData, subHeading}
        }
    })),
    setValueDataValue: (id: string, value: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            valueData: {
                ...state.aboutPageData.valueData,
                values: state.aboutPageData.valueData.values.map((val) => {
                    if (val._id.toString() === id) {
                        return {...val, value}
                    }
                    return val
                })
            }
        }
    })),
    setValueDataDescription: (id: string, description: string) => set((state) => ({
        aboutPageData: {
            ...state.aboutPageData,
            valueData: {
                ...state.aboutPageData.valueData,
                values: state.aboutPageData.valueData.values.map((val) => {
                    if (val._id.toString() === id) {
                        return {...val, description}
                    }
                    return val
                })
            }
        }
    }))
}))