import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://leighwest:zadVcfbWnRQWDTw3@ac-jwabefn-shard-00-00.tnkff0l.mongodb.net:27017,ac-jwabefn-shard-00-01.tnkff0l.mongodb.net:27017,ac-jwabefn-shard-00-02.tnkff0l.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-jqjrhf-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking", // list of paths I've specified might not be exhaustive (there might be more in the future). This stops nextjs responding with 404 to unknown pages
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://maximilian:arlAapzPqFyo4xUk@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
