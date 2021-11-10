import React from "react";
import "./ParkHeader.css";
const ParkHeader = (props) => {
  return (
    <div>
      <div className="parkHeader" w>
        <h1>{props.title}</h1>
      </div>
      <div className="description">
        <h1>
          Listed below are the parks that have the {props.title} activity! Feel
          free to click on them for more information on the park.
        </h1>
      </div>
    </div>
  );
};

export default ParkHeader;
