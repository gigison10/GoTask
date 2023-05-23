import "./projectField.scss";
import { Fragment } from "react";

function ProjectField(props) {
  function deleteProject() {
    console.log("asd");
  }

  return (
    <Fragment>
      {props.projectDetails.map((data) => (
        <div className="project-field" key={data.id}>
          <div type="submit" onClick={deleteProject} className="ckeckBlock">
            <input className="check" type="checkbox" />
            <button className="deteButton">delete</button>
          </div>
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
