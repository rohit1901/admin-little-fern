import {NextApiRequest, NextApiResponse} from "next";
import {getGoogleMapsUrl} from "@admin/lib";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const rawData = await fetch(getGoogleMapsUrl(process.env.PLACE_ID))
        const mapsData = await rawData.json()
        res.status(200).json({message: 'success', body: mapsData.result});
    } catch (e) {
        console.error("Error fetching home page data", e)
        res.status(500).json({message: 'Error fetching home page data', error: e});
    }
}