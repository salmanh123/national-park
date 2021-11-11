import React from "react";
import { useState, useEffect } from "react";
import ParkHeader from "./ParkHeader";
import ParkItem from "./ParkItem";
import "./Parks.css";

const Parks = (props) => {
  // useEffect hook called when page is loaded
  useEffect(() => {
    // fetchs api data, then logs yay if successful, else the error
    fetchParkActivity()
      .then((response) => {
        console.log("yay");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [parks, setParks] = useState([]);
  const activityID = props.match.params.id;
  let activityName = props.match.params.activity;

  // Asynchronously fetch API data from activites/parks while querying with the ID of the activity to get its specific parks
  const fetchParkActivity = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    // Create url 
    const url = `https://developer.nps.gov/api/v1/activities/parks?api_key=${apiKey}&id=${activityID}`
    
    //  fetch & await for api data
    const parkActivityData = await fetch(url);

    // Await for the parks associated with the activity to be sent to us
    const items = await parkActivityData.json();
    activityName = items.data[0].name;
    console.log(activityName);

    // Set the park data received
    setParks(items.data[0].parks);
  };

  // This function display the ParkItem component
  // By passing in the associated park to the component
  const mapParkName = (park) => {
    return (
      <div>
        <ParkItem parkItem={park} />
      </div>
    );
  };

  // We display the ParkHeader component with the name of the activity and map each park name to a small green box
  // calling the mapParkName function
  return (
    <div>
      <ParkHeader title={activityName} />
      <div className="park-div">{parks.map(mapParkName)}</div>
    </div>
  );
};

export default Parks;
