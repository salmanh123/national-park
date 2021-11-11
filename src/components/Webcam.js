import React from "react";
import { useEffect, useState } from "react";
import WebcamHeader from "./WebcamHeader";
import "./Webcam.css";


const Webcam = (props) => {

  // Wait for webcam data
  const [webcamData, setData] = useState([]);
  const parkName = props.match.params.parkName;
  const parkCode = props.match.params.parkCode;

  // useEffect called when page rendered & calls method to fetch webcam data
  useEffect(() => {
    // fetchs api data, then logs yay if successful, else the error
    fetchWebcamData()
      .then((response) => {
        console.log("yay webcam data");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // This async function will call the api for webcam data querying on the parkCode to 
  // attempt to get webcam data for that park which is webcam images 
  const fetchWebcamData = async () => {
    // api key and url
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://developer.nps.gov/api/v1/webcams?api_key=${apiKey}&parkCode=${parkCode}`;
    const parkData = await fetch(url);

    const items = await parkData.json();
    const webcamItems = items.data;
    //console.log(webcamItems); 
    // Set our useState item with the webcam data we receive
    setData(webcamItems);
  };

  /* Method below is called from a map function passed in an element from returned 
    webcam API data. It will display each image with their alttext if not able to*/
  const showImages = (imageData) => {
    return (
      // Displays images
      <div className="webcam-img">
        {imageData["images"].map((images) => {
          return (
            <div>
              <img
                className="web-image"
                src={images["url"]}
                alt={images["altText"]}
              ></img>
              <h2 className='web-image-caption'>{images['caption']}</h2>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <WebcamHeader name={parkName} />
      <div>
        <div className="webcam-page-text">
          <h1>
            Webcam images below! if none showing, there is a possibility no
            webcam images have been taken so far :(
          </h1>
        </div>

        {webcamData.map(showImages)}
      </div>
    </div>
  );
};

export default Webcam;
