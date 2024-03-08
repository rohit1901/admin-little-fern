import {WithId} from "mongodb";
import {SchoolProgram} from "@admin/types";
import {create} from "zustand";

type SchoolProgramsPageStore = {
    heading?: string,
    programs: WithId<SchoolProgram>[]
    setHeading: (heading: string) => void
    setPrograms: (programs: WithId<SchoolProgram>[]) => void
    setProgramName: (id: string, name: string) => void
    setProgramHeroTagline: (id: string, tagline: string) => void
    setProgramHeroHeadline: (id: string, headline: string) => void
    setProgramHeroText: (id: string, text: string) => void
    setProgramInfoSectionHeadline: (id: string, headline: string) => void
    setProgramInfoSectionText: (id: string, text: string) => void
    setProgramInfoSectionAges: (id: string, ages: string) => void
    setProgramInfoSectionDates: (id: string, dates: string) => void
    setProgramInfoSectionSchedule: (id: string, schedule: string) => void
    setProgramInfoSectionClassSize: (id: string, classSize: string) => void
    setProgramDescriptionSectionText: (id: string, text: string) => void
    setProgramPricingSectionTagline: (id: string, tagline: string) => void
    setProgramPricingSectionHeadline: (id: string, headline: string) => void
    setProgramPricingSectionText: (id: string, text: string) => void
    setProgramPricingSectionPricing1Name: (id: string, name: string) => void
    setProgramPricingSectionPricing1Price: (id: string, price: string) => void
    setProgramPricingSectionPricing1Interval: (id: string, interval: string) => void
    setProgramPricingSectionPricing1ShortDescription: (id: string, shortDescription: string) => void
    setProgramPricingSectionPricing2Name: (id: string, name: string) => void
    setProgramPricingSectionPricing2Price: (id: string, price: string) => void
    setProgramPricingSectionPricing2Interval: (id: string, interval: string) => void
    setProgramPricingSectionPricing2ShortDescription: (id: string, shortDescription: string) => void
}
export const useSchoolProgramsPageStore = create<SchoolProgramsPageStore>((set) => ({
    programs: [] as WithId<SchoolProgram>[],
    setHeading: (heading) => set({heading}),
    setPrograms: (programs) => set({programs}),
    setProgramName: (id, name) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, name
        } : program)
    })),
    setProgramHeroTagline: (id, tagline) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, hero: {...program.hero, tagline}
        } : program)
    })),
    setProgramHeroHeadline: (id, headline) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, hero: {...program.hero, headline}
        } : program)
    })),
    setProgramHeroText: (id, text) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, hero: {...program.hero, text}
        } : program)
    })),
    setProgramInfoSectionHeadline: (id, headline) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, infoSection: {...program.infoSection, headline}
        } : program)
    })),
    setProgramInfoSectionText: (id, text) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, infoSection: {...program.infoSection, text}
        } : program)
    })),
    setProgramInfoSectionAges: (id, ages) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, infoSection: {...program.infoSection, ages}
        } : program)
    })),
    setProgramInfoSectionDates: (id, dates) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, infoSection: {...program.infoSection, dates}
        } : program)
    })),
    setProgramInfoSectionSchedule: (id, schedule) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, infoSection: {...program.infoSection, schedule}
        } : program)
    })),
    setProgramInfoSectionClassSize: (id, classSize) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, infoSection: {...program.infoSection, classSize}
        } : program)
    })),
    setProgramDescriptionSectionText: (id, text) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, descriptionSection: {...program.descriptionSection, text}
        } : program)
    })),
    setProgramPricingSectionTagline: (id, tagline) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, pricingSection: {...program.pricingSection, tagline}
        } : program)
    })),
    setProgramPricingSectionHeadline: (id, headline) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, pricingSection: {...program.pricingSection, headline}
        } : program)
    })),
    setProgramPricingSectionText: (id, text) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program, pricingSection: {...program.pricingSection, text}
        } : program)
    })),
    setProgramPricingSectionPricing1Name: (id, name) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program,
            pricingSection: {...program.pricingSection, pricing1: {...program.pricingSection.pricing1, name}}
        } : program)
    })),
    setProgramPricingSectionPricing1Price: (id, price) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program,
            pricingSection: {...program.pricingSection, pricing1: {...program.pricingSection.pricing1, price}}
        } : program)
    })),
    setProgramPricingSectionPricing1Interval: (id, interval) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program,
            pricingSection: {...program.pricingSection, pricing1: {...program.pricingSection.pricing1, interval}}
        } : program)
    })),
    setProgramPricingSectionPricing1ShortDescription: (id, shortDescription) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program,
            pricingSection: {
                ...program.pricingSection,
                pricing1: {...program.pricingSection.pricing1, shortDescription}
            }
        } : program)
    })),
    setProgramPricingSectionPricing2Name: (id, name) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program,
            pricingSection: {...program.pricingSection, pricing2: {...program.pricingSection.pricing2, name}}
        } : program)
    })),
    setProgramPricingSectionPricing2Price: (id, price) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program,
            pricingSection: {...program.pricingSection, pricing2: {...program.pricingSection.pricing2, price}}
        } : program)
    })),
    setProgramPricingSectionPricing2Interval: (id, interval) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program,
            pricingSection: {...program.pricingSection, pricing2: {...program.pricingSection.pricing2, interval}}
        } : program)
    })),
    setProgramPricingSectionPricing2ShortDescription: (id, shortDescription) => set((state) => ({
        programs: state.programs.map((program) => program._id.toString() === id ? {
            ...program,
            pricingSection: {
                ...program.pricingSection,
                pricing2: {...program.pricingSection.pricing2, shortDescription}
            }
        } : program)
    })),
}))
