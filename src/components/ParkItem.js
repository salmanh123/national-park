import React from "react";
import { Link } from "react-router-dom";
import "./ParkItem.css";

const ParkItem = (props) => {


  // This component takes in a prop which contains data on a park hence the ParkItem component name.
  // We display the parks full name.
  return (
    <div className="park-container">
      <div className="park-item">
        <h1 className="park-name">{props.parkItem.fullName}</h1>
      </div>

      {/* We insert a Link component to /park/ParkName/ParkCode to disiplay informationon that park */}
      <div className="park-link">
        <Link className="park-link-tag" to={`/park/${props.parkItem.name}/${props.parkItem.parkCode}`}>
          Learn More!
        </Link>
      </div>
    </div>
  );
};

export default ParkItem;
