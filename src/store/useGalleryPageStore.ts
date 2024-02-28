import {GalleryPageData} from "@admin/types";
import {create} from "zustand";

type GalleryPageStore = {
    galleryPageData: GalleryPageData
    setGalleryPageData: (data: GalleryPageData) => void
    setTextBlockHeadline: (headline: string) => void
    setTextBlockText: (text: string) => void
    setGalleryHeroTagline: (tagline: string) => void
    setGalleryHeroHeadline: (headline: string) => void
    setGalleryHeroText: (text: string) => void
    setGalleryItemTag: (id: string, tag: string) => void
}
export const useGalleryPageStore = create<GalleryPageStore>((set) => ({
    galleryPageData: {} as GalleryPageData,
    setGalleryPageData: (data) => set({galleryPageData: data}),
    setTextBlockHeadline: (headline) => set((state) => ({
        galleryPageData: {
            ...state.galleryPageData,
            textBlock: {
                ...state.galleryPageData.textBlock,
                headline
            }
        }
    })),
    setTextBlockText: (text) => set((state) => ({
        galleryPageData: {
            ...state.galleryPageData,
            textBlock: {
                ...state.galleryPageData.textBlock,
                text
            }
        }
    })),
    setGalleryHeroTagline: (tagline) => set((state) => ({
        galleryPageData: {
            ...state.galleryPageData,
            pageHero: {
                ...state.galleryPageData.pageHero,
                tagline
            }
        }
    })),
    setGalleryHeroHeadline: (headline) => set((state) => ({
        galleryPageData: {
            ...state.galleryPageData,
            pageHero: {
                ...state.galleryPageData.pageHero,
                headline
            }
        }
    })),
    setGalleryHeroText: (text) => set((state) => ({
        galleryPageData: {
            ...state.galleryPageData,
            pageHero: {
                ...state.galleryPageData.pageHero,
                text
            }
        }
    })),
    setGalleryItemTag: (id, tag) => set((state) => ({
        galleryPageData: {
            ...state.galleryPageData,
            gallery: state.galleryPageData.gallery.map((item) => {
                if (item._id.toString() === id) {
                    return {
                        ...item,
                        tag
                    }
                }
                return item
            })
        }
    }))
}))
