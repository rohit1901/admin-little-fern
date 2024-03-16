import {NextApiRequest, NextApiResponse} from "next";
import {getMongoDb} from "@admin/lib/mongodb";
import {NotificationPageData} from "@admin/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        const notificationsPageData = await db
            ?.collection<NotificationPageData>('notifications')
            .find()
            .sort({dateCreated: -1})
            .limit(1)
            .toArray()
        res.status(200).json({message: 'success', body: notificationsPageData[0]});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Error fetching notifications from MongoDB'});
    }
}