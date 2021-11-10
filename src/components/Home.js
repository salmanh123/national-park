import React from "react";
import Header from "./Header";
import { useState, useEffect, Component } from "react";
import ReactDom from "react-dom";
import "./Home.css";
import Activity from "./Activity";

const Home = () => {
  // useEffect to fetch API data when page is loaded
  useEffect(() => {

    // fetchs api data, then logs yay if successful, else the error
    fetchItems()
      .then((response) => {
        console.log("yay");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // useState used to update dynamic data of the park items
  const [parkItems, setItems] = useState([]);

  // This method asynchronously calls the nps api on activities/parks to get the associated parks for the activities
  const fetchItems = async () => {
    const parkActivityData = await fetch(
      "https://developer.nps.gov/api/v1/activities/parks?api_key=nhAaNjq6XFeiFj0JmWbXkBrjJRc0uC2YcJCfTuKB"
    );
        // wait for the api data
    const items = await parkActivityData.json();
    console.log(items.data);
    // set our parkItems to the API data
    setItems(items.data);
    console.log(parkItems);
  };

  // This method displays the Activity component and passes a prop of the iterator object passed into the function from
  // parkItems.map, this prop will display the activities
  const mapParkItem = (parkItem) => {
    return (
      <div>
        <Activity parkItem={parkItem} />
      </div>
    );
  };

  return (
    <div className="test">
        {/* Display Header component & map our park data with the .map function and a function passed in */}
      <Header />
      <div className="activity-container">{parkItems.map(mapParkItem)}</div>
    </div>
  );
};

export default Home;
