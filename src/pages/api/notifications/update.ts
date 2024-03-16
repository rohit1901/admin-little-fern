import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {NotificationPageData} from "@admin/types";
import {ObjectId, WithId} from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        if (req.method === 'POST') {
            const notificationPageData = req.body as WithId<NotificationPageData>;
            const {_id, ...rest} = notificationPageData;
            const newNotificationPageData: NotificationPageData = {
                ...rest,
                dateCreated: new Date(),
                notifications: notificationPageData.notifications.map((notification) => {
                    return {
                        ...notification,
                        read: true
                    }
                })
            }
            await db.collection('notifications')
                .updateOne({_id: new ObjectId(_id)}, {$set: newNotificationPageData});
            res.status(200).json({message: 'success', body: newNotificationPageData});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Error updating home page', error: e});
    }
}