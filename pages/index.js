import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList.js";
import { URI } from "constants";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/b/b0/Melbourne_Skyline_and_Princes_Bridge_-_Dec_2008_%28cropped%29.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/b/b0/Melbourne_Skyline_and_Princes_Bridge_-_Dec_2008_%28cropped%29.jpg",
//     address: "Some address 1, 54321 Some City",
//     description: "This is a second meetup",
//   },
// ];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
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
