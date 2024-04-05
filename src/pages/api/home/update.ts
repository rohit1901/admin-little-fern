import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";
import {HomePageData} from "@admin/types";
import {Db, ObjectId, WithId} from "mongodb";

const handlePost = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
    const homePageData = req.body as WithId<HomePageData>;
    const newHomePageData: WithId<HomePageData> = {
        ...homePageData,
        dateCreated: new Date()
    }
    await db.collection('home_page').insertOne(newHomePageData);
    res.status(200).json({message: 'success', body: newHomePageData});
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse, db: Db) => {
    const homePageData = req.body as WithId<HomePageData>;
    if (!homePageData._id) {
        res.status(400).json({message: 'Missing _id from request body'});
        return;
    }
    const updatedHomePageData: WithId<HomePageData> = {
        ...homePageData,
        dateCreated: new Date()
    }
    await db.collection('home_page').updateOne({_id: new ObjectId(updatedHomePageData._id)}, {
        $set: {
            homeHero: {...updatedHomePageData.homeHero, ratings: updatedHomePageData.homeHero.ratings},
            testimonialsBlock: updatedHomePageData.testimonialsBlock,
        }
    });
    res.status(200).json({message: 'success', body: updatedHomePageData});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await getMongoDb();
        switch (req.method) {
            case 'POST':
                await handlePost(req, res, db);
                break;
            case 'PUT':
                await handlePut(req, res, db);
                break;
            default:
                res.setHeader('Allow', ['POST', 'PUT']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (e) {
        console.error('Error updating home page', e);
        res.status(500).json({message: 'Error updating home page', error: e});
    }
}