import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://leighwest:zadVcfbWnRQWDTw3@ac-jwabefn-shard-00-00.tnkff0l.mongodb.net:27017,ac-jwabefn-shard-00-01.tnkff0l.mongodb.net:27017,ac-jwabefn-shard-00-02.tnkff0l.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-jqjrhf-shard-0&authSource=admin&retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
