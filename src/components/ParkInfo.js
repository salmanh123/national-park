import React from "react";
import "./ParkInfo.css";
import ParkInfoHeader from "./ParkInfoHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ParkInfo = (props) => {
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

  const parkName = props.match.params.parkName;
  const parkCode = props.match.params.parkCode;
  const [parkData, setParkData] = useState([]);
  const [actData, setActData] = useState([])
  const [feeData, setFeeData] = useState([])
  const [phoneNumber, setPhone] = useState([])
  const [emails, setEmail] = useState([])
  const [opHour, setOPHour] = useState("")
  const fetchParkData = async () => {
    const url = `https://developer.nps.gov/api/v1/parks?api_key=nhAaNjq6XFeiFj0JmWbXkBrjJRc0uC2YcJCfTuKB&parkCode=${parkCode}`;
    const parkData = await fetch(url);

    const items = await parkData.json();
    const itemData = items.data[0];
    let parkActivity = items.data[0]['activities']
    let parkFeeData = items.data[0]['entranceFees']
    let ourOP = items.data[0]['operatingHours']
    let phoneNumbers = items.data[0]['contacts']['phoneNumbers']
    let emailData = items.data[0]['contacts']['emailAddresses']
    console.log(parkActivity)
    console.log(itemData);
    setActData(parkActivity);
    setParkData(itemData);
    setFeeData(parkFeeData)
    setPhone(phoneNumbers)
    setEmail(emailData)
    setOPHour(ourOP[0]['description'])
  };
  const mapActivities = (activity) =>{
    return (
      
        <h3>
          {activity.name}
        </h3>
      
    )
  }
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
      <div className="webcam-div">
        <Link to={`/webcam/${parkName}/${parkCode}`}>
          {" "}
          <h1>Click here to view recent webcam images!</h1>
        </Link>
      </div>
      <div div='content-div'>

        <div className="description-div">
          <h1>Description</h1>
          <h3>{parkData["description"]}</h3>
          <h3>{opHour}</h3>
        </div>

        <div className='weather-div'>
          <h1>Weather Info</h1>
          <h3>{parkData['weatherInfo']}</h3>
        </div>

        <div className='fee-div'> 
              <h1>Fees</h1>
              <div className='fee-list'>
            {feeData.map(mapFees)}
          </div>
        </div>

        <div className="things-to-do-div">
          <h1>Things to do!</h1>
           <div className='things-list'>
            {actData.map(mapActivities)}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ParkInfo;
