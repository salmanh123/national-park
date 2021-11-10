import React from "react";
import { Link } from "react-router-dom";
import "./Activity.css";

const Activity = (props) => {
  return (

    /*
      Down below we display the name of the activity with props.parkItem.name.
      We then display a link to show which parks offers that activity. Using the
      Link component, it will route to parks/ActivityName/ActivityID
    */

    <div className="card-container">
      <div className="card-title">
        <h1 className="activity-name">{props.parkItem.name}</h1>
      </div>
      <div className='link'>
          <Link className='linkTag'  to={`parks/${props.parkItem.name}/${props.parkItem.id}`} >Visit Parks</Link>
      </div>
    </div>
  );
};

export default Activity;
