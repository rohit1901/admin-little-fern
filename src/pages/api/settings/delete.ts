import {NextApiRequest, NextApiResponse} from 'next';
import {getMongoDb} from "@admin/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const documentNames = ['home_page', 'about_page', 'contact_page', 'parents_page', 'school_programs', 'gallery_page']
    try {
        const db = await getMongoDb();
        let totalDeleted = 0;

        for (const documentName of documentNames) {
            const collection = db.collection(documentName);

            // Find the latest document
            const latestDocument = await collection.find().sort({dateCreated: -1}).limit(1).toArray();

            if (latestDocument.length > 0) {
                // Delete all documents where dateCreated is less than the dateCreated of the latest document
                const result = await collection.deleteMany({dateCreated: {$lt: latestDocument[0].dateCreated}});
                console.log(`Deleted ${result.deletedCount} documents from ${documentName}.`);
                totalDeleted += result.deletedCount;
            }
        }

        res.status(200).json({message: `Successfully deleted ${totalDeleted} documents.`});
    } catch (e) {
        console.error('Error connecting to MongoDB', e);
        res.status(500).json({message: 'Error connecting to MongoDB'});
    }
}