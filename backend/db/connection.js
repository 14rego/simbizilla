import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGOURI || "";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB.");
} catch(err) {
    console.error(err);
}

let db = client.db(process.env.MONGODBNAME || "");
export default db;