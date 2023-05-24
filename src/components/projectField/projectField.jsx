import "./projectField.scss";
import { Fragment } from "react";

function ProjectField(props) {
  function handleDeleteProject(projectId) {
    props.deleteProject(projectId);
    // console.log(projectId);
  }

  return (
    <Fragment>
      {props.projectDetails.map((data) => (
        <div className="project-field" key={data.projectId}>
          <div
            type="submit"
            onClick={() => handleDeleteProject(data.projectId)}
            className="ckeckBlock"
          >
            <input className="check" type="checkbox" />
            <button className="deteButton">delete</button>
          </div>
          <h5>{data.projectName}</h5>
          <h5>{data.startingDate}</h5>
          <h5>{data.deadLine}</h5>
          <h5>In progress</h5>
        </div>
      ))}
    </Fragment>
  );
}

export default ProjectField;
