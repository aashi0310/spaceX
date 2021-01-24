import React from "react";
import "./RocketLaunchDetails.css";

function RocketLaunchDetails({ details }) {
  const {
    flight_number,
    mission_name,
    mission_id,
    launch_year,
    launch_success,
    links,
    rocket,
  } = details;
  const imgSrc = links.mission_patch_small;
  const land_success = rocket.first_stage.cores[0].land_success;

  return (
    <div className="Rocket-details-card card">
      <div key={flight_number}>
        <div>
          <img
            src={imgSrc}
            alt="img not available"
            className="Rocket-image"
          />
        </div>
        <div className="Rocket-name-flight-number">
          {mission_name} #{flight_number}
        </div>
        <div className="Rocket-detail-label">
          Mission Ids:
          {mission_id.length > 0 ? <ul>
            <li className="Rocket-detail-value">{mission_id}</li>
          </ul> : <span className="Rocket-detail-value">No Data</span>}
          
        </div>
        <div className="Rocket-detail-label">
          Launch Year:
          <span className="Rocket-detail-value">{launch_year}</span>
        </div>
        <div className="Rocket-detail-label">
          Successful Launch:
          <span className="Rocket-detail-value">
            {launch_success ? "true" : "false"}
          </span>
        </div>
        <div className="Rocket-detail-label">
          Successful Landing:
          <span className="Rocket-detail-value">
            {land_success ? "true" : "false"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RocketLaunchDetails;
