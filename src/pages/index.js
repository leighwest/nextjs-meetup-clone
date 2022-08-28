import MeetupList from "components/meetups/MeetupList.js";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b0/Melbourne_Skyline_and_Princes_Bridge_-_Dec_2008_%28cropped%29.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b0/Melbourne_Skyline_and_Princes_Bridge_-_Dec_2008_%28cropped%29.jpg",
    address: "Some address 1, 54321 Some City",
    description: "This is a second meetup",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 3600, // revalidate every hour after deployment
  };
}

export default HomePage;
