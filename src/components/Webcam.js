import React from "react";
import { useEffect, useState } from "react";

import WebcamHeader from "./WebcamHeader";
import "./Webcam.css";
const Webcam = (props) => {
  const [webcamData, setData] = useState([]);
  const parkName = props.match.params.parkName;
  const parkCode = props.match.params.parkCode;
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
  const fetchWebcamData = async () => {
    const url = `https://developer.nps.gov/api/v1/webcams?api_key=nhAaNjq6XFeiFj0JmWbXkBrjJRc0uC2YcJCfTuKB&parkCode=${parkCode}`;
    const parkData = await fetch(url);

    const items = await parkData.json();
    const webcamItems = items.data;
    console.log(webcamItems);
    setData(webcamItems);
  };
  const showImages = (imageData) => {
    return (
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
