import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList.js";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb://leighwest:zadVcfbWnRQWDTw3@ac-jwabefn-shard-00-00.tnkff0l.mongodb.net:27017,ac-jwabefn-shard-00-01.tnkff0l.mongodb.net:27017,ac-jwabefn-shard-00-02.tnkff0l.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-jqjrhf-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3600, // revalidate every hour after deployment
  };
}

export default HomePage;
