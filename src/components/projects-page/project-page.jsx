import "./project-page.css";
import { useState } from "react";

function ProjectPage() {
  const projectList = (
    <div className="project-list">
      <h5>Project name</h5>
      <h5>Date</h5>
      <h5>stage in working or completed</h5>
      <h5>Dead line</h5>
      <h5>Mark as completed</h5>
    </div>
  );

  const newProjectList = (
    <div className="project-list">
      <input
        type="text"
        placeholder="Project name"
        onChange={(event) => {
          console.log(event.target.value);
          setName(event.target.value);
        }}
      ></input>
      <input type="text" placeholder="Date"></input>
      <input type="text" placeholder="In Progress"></input>
      <input type="text" placeholder="Dead line"></input>
      <input
        type="submit"
        value="Add"
        onClick={() => {
          setProject(projectList);
          console.log(name);
        }}
      ></input>
    </div>
  );

  const [name, setName] = useState("");
  let [project, setProject] = useState(projectList);

  return (
    <div className="project-container">
      <div className="project-menu">
        <div>sort by</div>
        <div>Add new project</div>
        <div
          className="button"
          onClick={() => {
            setProject(newProjectList);
          }}
        >
          Add project
        </div>
      </div>
      {project}
    </div>
  );
}

export default ProjectPage;
