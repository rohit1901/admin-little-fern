import {create} from 'zustand';
import {Faq, HomeFeatureBlock, HomePageData, Rating, TestimonialsBlock} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

type HomePageStore = {
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
    setFaqBlockHeading: (heading: string) => void;
    setFaqQuestion: (id: ObjectId, question: string) => void;
    setFaqAnswer: (id: ObjectId, answer: string) => void;
    setRatings: (ratings: Rating[]) => void;
    setTestimonialsBlock: (testimonialsBlock: TestimonialsBlock) => void;
};

export const useHomePageStore = create<HomePageStore>((set) => ({
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
        const nFeatureBlock: WithId<HomeFeatureBlock> | undefined =
            state.homePageData.schoolFeatures?.featureBlocks?.find((block) => block._id.toString() === id.toString())
        if (!nFeatureBlock) return state
        const newFeatureBlock: WithId<HomeFeatureBlock> = {...nFeatureBlock, tagline: tagline}
        const newFeatureBlocks =
            state.homePageData.schoolFeatures?.featureBlocks?.map((block) => {
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
        const nFeatureBlock: WithId<HomeFeatureBlock> | undefined =
            state.homePageData.schoolFeatures?.featureBlocks?.find((block) => block._id.toString() === id.toString())
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
        const nFeatureBlock: WithId<HomeFeatureBlock> | undefined =
            state.homePageData.schoolFeatures?.featureBlocks?.find((block) => block._id.toString() === id.toString())
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
    setFaqBlockHeading: (heading: string) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            faqBlock: {...state.homePageData.faqBlock, heading: heading}
        }
    })),
    setFaqQuestion: (id: ObjectId, question: string) => set((state) => {
        const nFaq: WithId<Faq> | undefined = state.homePageData.faqBlock?.faqs?.find((faq) => faq._id.toString() === id.toString())
        if (!nFaq) return state
        const newFaq: WithId<Faq> = {...nFaq, question: question}
        const newFaqs = state.homePageData.faqBlock?.faqs?.map((faq) => {
            if (faq._id.toString() === nFaq?._id.toString()) {
                return newFaq
            }
            return faq
        })
        if (!newFaqs) return state
        return {
            homePageData: {
                ...state.homePageData,
                faqBlock: {...state.homePageData.faqBlock, faqs: newFaqs}
            }
        }
    }),
    setFaqAnswer: (id: ObjectId, answer: string) => set((state) => {
        const nFaq: WithId<Faq> | undefined = state.homePageData.faqBlock?.faqs?.find((faq) => faq._id.toString() === id.toString())
        if (!nFaq) return state
        const newFaq: WithId<Faq> = {...nFaq, answer: answer}
        const newFaqs = state.homePageData.faqBlock?.faqs?.map((faq) => {
            if (faq._id.toString() === nFaq?._id.toString()) {
                return newFaq
            }
            return faq
        })
        if (!newFaqs) return state
        return {
            homePageData: {
                ...state.homePageData,
                faqBlock: {...state.homePageData.faqBlock, faqs: newFaqs}
            }
        }
    }),
    setRatings: (ratings: Rating[]) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            homeHero: {...state.homePageData.homeHero, ratings: ratings}
        }
    })),
    setTestimonialsBlock: (block: TestimonialsBlock) => set((state) => ({
        homePageData: {
            ...state.homePageData,
            testimonialsBlock: block
        }
    }))
}));