import { MongoClient } from "mongodb";

const uri =
  "mongodb://leighwest:zadVcfbWnRQWDTw3@ac-jwabefn-shard-00-00.tnkff0l.mongodb.net:27017,ac-jwabefn-shard-00-01.tnkff0l.mongodb.net:27017,ac-jwabefn-shard-00-02.tnkff0l.mongodb.net:27017/?ssl=true&replicaSet=atlas-jqjrhf-shard-0&authSource=admin&retryWrites=true&w=majority";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = new MongoClient(uri);

    await client.connect();

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
