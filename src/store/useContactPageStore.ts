import {ContactPageData} from "@admin/types";
import {create} from "zustand";

type ContactPageStore = {
    contactPageData: ContactPageData,
    setContactPageData: (data: ContactPageData) => void,
    setHeroTagline: (tagline: string) => void,
    setHeroHeadline: (headline: string) => void,
    setHeroText: (text: string) => void,
    setHeroYouTubeLink: (youTubeLink: string) => void,
    setContactInformationAddress: (address: string) => void,
    setContactInformationPhone: (phone: string) => void,
    setContactInformationEmail: (email: string) => void,
    setTextBlockHeadline: (headline: string) => void,
    setTextBlockText: (text: string) => void,
}
export const useContactPageStore = create<ContactPageStore>((set) => ({
    contactPageData: {} as ContactPageData,
    setContactPageData: (data: ContactPageData) => set({contactPageData: data}),
    setHeroTagline: (tagline: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            contactInformation: {
                ...state.contactPageData?.contactInformation,
                hero: {...state.contactPageData?.contactInformation.hero, tagline}
            }
        }
    })),
    setHeroHeadline: (headline: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            contactInformation: {
                ...state.contactPageData?.contactInformation,
                hero: {...state.contactPageData?.contactInformation.hero, headline}
            }
        }
    })),
    setHeroText: (text: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            contactInformation: {
                ...state.contactPageData?.contactInformation,
                hero: {...state.contactPageData?.contactInformation.hero, text}
            }
        }
    })),
    setHeroYouTubeLink: (youTubeLink: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            contactInformation: {
                ...state.contactPageData?.contactInformation,
                hero: {...state.contactPageData?.contactInformation.hero, youTubeLink}
            }
        }
    })),
    setContactInformationAddress: (address: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            contactInformation: {...state.contactPageData?.contactInformation, address}
        }
    })),
    setContactInformationPhone: (phone: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            contactInformation: {...state.contactPageData?.contactInformation, phone}
        }
    })),
    setContactInformationEmail: (email: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            contactInformation: {...state.contactPageData?.contactInformation, email}
        }
    })),
    setTextBlockHeadline: (headline: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            textBlock: {...state.contactPageData?.textBlock, headline}
        }
    })),
    setTextBlockText: (text: string) => set((state) => ({
        contactPageData: {
            ...state.contactPageData,
            textBlock: {...state.contactPageData?.textBlock, text}
        }
    })),
}))