import { useState } from "react";
import "./project-add.scss";

function ProjectAdd(props) {
  const [projectName, setProjectName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [button, setButton] = useState("Add Project");
  const [showHide, setShowHide] = useState("hide");

  function showHideFunc() {
    if (button === "Add Project") {
      setShowHide("show");
    } else {
      setShowHide("hide");
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    if (showHide === "hide") {
      const projectDetails = {
        projectName: projectName,
        startingDate: startingDate,
        deadLine: deadLine,
      };
      // console.log(projectDetails);
      props.onSaveProjectDetails(projectDetails);
      setProjectName("");
      setStartingDate("");
      setDeadLine("");
    } else return;
    // console.log("check");
  }

  return (
    <form onSubmit={submitHandler} className="project-list">
      <div className="input-fields">
        <h4>Project Name</h4>
        <input
          className={showHide}
          required
          value={projectName}
          type="text"
          placeholder="Project name"
          onChange={(event) => {
            setProjectName(event.target.value);
          }}
        />
      </div>
      <div className="input-fields">
        <h4>Starting date</h4>
        <input
          className={showHide}
          value={startingDate}
          type="date"
          placeholder="Date"
          onChange={(event) => {
            setStartingDate(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-fields">
        <h4>Dead Line</h4>
        <input
          className={showHide}
          value={deadLine}
          type="date"
          placeholder="Dead line"
          onChange={(event) => {
            setDeadLine(event.target.value);
          }}
        ></input>
      </div>
      <button
        className="addProjectButton"
        type="submit"
        onClick={() => {
          showHideFunc();
          button === "Add Project"
            ? setButton("submit")
            : setButton("Add Project");
        }}
      >
        {button}
      </button>
    </form>
  );
}

export default ProjectAdd;
