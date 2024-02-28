import {MongoClient} from 'mongodb'

export async function getMongoClient(): Promise<MongoClient> {
    /**
     * Global is used here to maintain a cached connection across hot reloads
     * in development. This prevents connections growing exponentiatlly
     * during API Route usage.
     * https://github.com/vercel/next.js/pull/17666
     */
    // @ts-ignore
    if (!global.mongoClientPromise) {
        const client = new MongoClient(process.env.MONGODB_URI ?? '')
        // client.connect() returns an instance of MongoClient when resolved
        // @ts-ignore
        global.mongoClientPromise = client.connect()
    }
    // @ts-ignore
    return global.mongoClientPromise
}

export async function getMongoDb() {
    const mongoClient = await getMongoClient()
    return mongoClient.db('little_fern_db')
}
