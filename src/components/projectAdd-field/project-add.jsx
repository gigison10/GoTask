import { useState } from "react";
import "./project-add.scss";

function ProjectAdd(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
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
        name: name,
        date: date,
        deadLine: deadLine,
      };
      // console.log(projectDetails);
      props.onSaveProjectDetails(projectDetails);
      setName("");
      setDate("");
      setDeadLine("");
    } else return;
  }

  return (
    <form onSubmit={submitHandler} className="project-list">
      <div className="input-fields">
        <h4>Project Name</h4>
        <input
          className={showHide}
          required
          value={name}
          type="text"
          placeholder="Project name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div className="input-fields">
        <h4>Starting date</h4>
        <input
          className={showHide}
          value={date}
          type="date"
          placeholder="Date"
          onChange={(event) => {
            setDate(event.target.value);
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
