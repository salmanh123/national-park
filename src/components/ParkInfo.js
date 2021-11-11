import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ParkInfoHeader from "./ParkInfoHeader";
import "./ParkInfo.css";

// This component shows information on a park
const ParkInfo = (props) => {

  // useEffect called when page loaded
  useEffect(() => {
    // fetchs api data, then logs yay if successful, else the error
    fetchParkData()
      .then((response) => {
        console.log("yay");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // from the URL, we grab the parkname & id
  const parkName = props.match.params.parkName;
  const parkCode = props.match.params.parkCode;

  /*
    Below we have 6 pieces of data which we will wait for the
    api to supply data for to populate our page using useState 
    to update the state of the page.

    First we have the park data, next we have actData which is 
    each activity in that park. 
    
    Next we have feeData which is data on each fee in that park. 
    
    We then get the contact information
    denoted by phoneNumber which is an array of contact numbers & emails
    which is an array of contact emails. 
    
    Finally we have opHour which is a string of operation hour DESCRIPTION.
  */
  const [parkData, setParkData] = useState([]);
  const [actData, setActData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [phoneNumber, setPhone] = useState([]);
  const [emails, setEmail] = useState([]);
  const [opHour, setOPHour] = useState("");

  // Async function to call api and update state variables above
  const fetchParkData = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&parkCode=${parkCode}`;
    const parkData = await fetch(url);
    const items = await parkData.json();

    
    // Data below is denoted by how it is indexed
    const itemData = items.data[0]; // all relevent data is in the first element of the returned API data
    const parkActivity = items.data[0]['activities']
    const parkFeeData = items.data[0]['entranceFees']
    const ourOP = items.data[0]['operatingHours'][0]['description']
    const phoneNumbers = items.data[0]['contacts']['phoneNumbers']
    const emailData = items.data[0]['contacts']['emailAddresses']
    //console.log(parkActivity)
    //console.log(itemData);

    // set park, activity, fee, phone, email, opHour data
    setParkData(itemData);
    setActData(parkActivity);
    setFeeData(parkFeeData)
    setPhone(phoneNumbers)
    setEmail(emailData)
    setOPHour(ourOP)
  };

  // Maps each activity from actData
  const mapActivities = (activity) =>{
    return (
      
        <h3>
          {activity.name}
        </h3>
      
    )
  }

  // Maps & displays all fee data from array of feeData
  const mapFees = (fee) =>{
    return (
      <div className='fee-data'>
        <h3>Title: {fee.title}</h3>
        <h3>Description: {fee.description}</h3>
        <h3>Cost: {fee.cost}</h3>
      </div>
    )
  }

  return (
    <div>
      <ParkInfoHeader name={parkName} emailData={emails} parkData={parkData} phoneNum={phoneNumber}/>


      {/* Div below links to webcam images */}
      <div className="webcam-div">
        <Link to={`/webcam/${parkName}/${parkCode}`}>
          {" "}
          <h1>Click here to view recent webcam images!</h1>
        </Link>
      </div>


      <div div='content-div'>

        {/* div below contains park description & operating hour info */}
        <div className="description-div">
          <h1>Description</h1>
          <h3>{parkData["description"]}</h3>
          <h3>{opHour}</h3>
        </div>

        {/* Div below displays weather information */}
        <div className='weather-div'>
          <h1>Weather Info</h1>
          <h3>{parkData['weatherInfo']}</h3>
        </div>

        {/* Div below maps out & displays all fee data */}
        <div className='fee-div'> 
              <h1>Fees</h1>
              <div className='fee-list'>
            {feeData.map(mapFees)}
          </div>
        </div>

        {/* Div below maps our each activity */}
        <div className="things-to-do-div">
          <h1>Things to do!</h1>
          <div className='things-list'>
            {actData.map(mapActivities)}
          </div>
        </div>
        
        {/* div tag below is 2nd order div with all the parkinfo such as description, activities, etc encapsulated */}
      </div>
      {/* div tag below is ending of highest order div tag  */}
    </div>  
  );
};

export default ParkInfo;
