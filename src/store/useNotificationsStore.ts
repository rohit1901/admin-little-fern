import {NotificationPageData} from "@admin/types";
import {create} from "zustand";

type NotificationsStore = {
    notificationPageData?: NotificationPageData,
    setNotificationPageData: (notificationPageData: NotificationPageData) => void
}
export const useNotificationsStore = create<NotificationsStore>((set) => ({
    setNotificationPageData: (notificationPageData: NotificationPageData) => set({notificationPageData}),
}))