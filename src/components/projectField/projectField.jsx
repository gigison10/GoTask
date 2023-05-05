import "./projectField.scss";

import { useState, Fragment } from "react";

function ProjectField(props) {
  // const [projectDetails, setProjectDetails] = useState([]);
  console.log(...props.projectDetails);
  return (
    <Fragment>
      {props.projectDetails.map((data) => (
        <div className="project-field" key={data.id}>
          <input className="check" type="checkbox" />
          <h5>{data.name}</h5>
          <h5>{data.date}</h5>
          <h5>{data.deadLine}</h5>
          <h5>In progress</h5>
        </div>
      ))}
    </Fragment>
  );
}

export default ProjectField;
