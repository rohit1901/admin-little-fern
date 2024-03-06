import {ParentsPageData} from "@admin/types";
import {create} from "zustand";
import {WithId} from "mongodb";

type ParentsPageStore = {
    parentsPageData: WithId<ParentsPageData>
    setParentsPageData: (data: WithId<ParentsPageData>) => void
    setHeroTagline: (tagline: string) => void
    setHeroHeadline: (headline: string) => void
    setHeroText: (text: string) => void
    setHeroItemLabel: (id: string, label: string) => void
    setHeroItemDescription: (id: string, description: string) => void
    setHeroItemIcon: (id: string, icon: string) => void
    setHeroItemHref: (id: string, href: string) => void
    setEventName: (id: string, name: string) => void
    setEventDates: (id: string, dates: string) => void
    setEventDescription: (id: string, description: string) => void
    setEventsText: (text: string) => void
    setEventsHeadline: (headline: string) => void
}
export const useParentsPageStore = create<ParentsPageStore>((set) => ({
    parentsPageData: {} as WithId<ParentsPageData>,
    setParentsPageData: (data: WithId<ParentsPageData>) => set(() => ({parentsPageData: data})),
    setHeroTagline: (tagline: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            hero: {...state.parentsPageData.hero, tagline}
        }
    })),
    setHeroHeadline: (headline: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            hero: {...state.parentsPageData.hero, headline}
        }
    })),
    setHeroText: (text: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            hero: {...state.parentsPageData.hero, text}
        }
    })),
    setHeroItemLabel: (id: string, label: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            heroItems: state.parentsPageData.heroItems.map(item => item._id.toString() === id ? {...item, label} : item)
        }
    })),
    setHeroItemDescription: (id: string, description: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            heroItems: state.parentsPageData.heroItems.map(item => item._id.toString() === id ? {
                ...item,
                description
            } : item)
        }
    })),
    setHeroItemIcon: (id: string, icon: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            heroItems: state.parentsPageData.heroItems.map(item => item._id.toString() === id ? {...item, icon} : item)
        }
    })),
    setHeroItemHref: (id: string, href: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            heroItems: state.parentsPageData.heroItems.map(item => item._id.toString() === id ? {...item, href} : item)
        }
    })),
    setEventName: (id: string, name: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            events: state.parentsPageData.events.map(event => event._id.toString() === id ? {...event, name} : event)
        }
    })),
    setEventDates: (id: string, dates: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            events: state.parentsPageData.events.map(event => event._id.toString() === id ? {...event, dates} : event)
        }
    })),
    setEventDescription: (id: string, description: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            events: state.parentsPageData.events.map(event => event._id.toString() === id ? {
                ...event,
                description
            } : event)
        }
    })),
    setEventsText: (text: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            eventsText: {...state.parentsPageData.eventsText, text}
        }
    })),
    setEventsHeadline: (headline: string) => set((state) => ({
        parentsPageData: {
            ...state.parentsPageData,
            eventsText: {...state.parentsPageData.eventsText, headline}
        }
    }))

}))