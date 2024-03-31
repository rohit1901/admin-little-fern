import {NextApiRequest, NextApiResponse} from 'next'
import {getMongoDb} from "@admin/lib/mongodb";
import {LFNotification, NotificationPageData} from "@admin/types";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb()
        if (req.method === 'POST') {
            const collections = db
                .collection<NotificationPageData>('notifications')
                .find({})
                .sort({dateCreated: -1})
                .limit(1)
                .toArray()
            const docs = await collections
            if (!docs[0] || docs[0] === null || docs.length === 0) {
                await db.collection('notifications').insertOne({
                    notifications: req.body.notifications.map((n: LFNotification) => ({
                        ...n,
                        dateCreated: new Date(n.dateCreated),
                    })),
                    dateCreated: new Date(),
                })
                res.status(200).json({
                    message: 'Notification page data created',
                })
                return
            }
            await db.collection('notifications').updateOne(
                {_id: new ObjectId(docs[0]._id)},
                {
                    $set: {
                        notifications: req.body.notifications.map((n: LFNotification) => ({
                            ...n,
                            dateCreated: new Date(n.dateCreated),
                        })),
                        dateCreated: new Date(),
                    },
                },
            )
            res
                .status(200)
                .json({message: 'Notification page data updated'})
        }
    } catch (e) {
        console.error(e)
        res
            .status(500)
            .json({message: 'Error updating Notifications page', error: e})
    }
}
