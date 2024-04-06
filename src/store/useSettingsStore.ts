import {create} from "zustand";

type SettingsStore = {
    imagePreviews: boolean
    setImagePreviews: (imagePreviews: boolean) => void
}
export const useSettingsStore = create<SettingsStore>((set) => ({
    imagePreviews: true,
    setImagePreviews: (imagePreviews: boolean) => set({imagePreviews}),
}))