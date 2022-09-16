import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    console.log(`data in new-meetup.js is: ${data.title}`);

    const client = await MongoClient.connect(
      "mongodb+srv://leighwest:zadVcfbWnRQWDTw3@cluster0.tnkff0l.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
