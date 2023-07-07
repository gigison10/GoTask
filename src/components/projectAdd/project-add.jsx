import { useState, useRef } from "react";
import ProjectList from "../projectList/projectList";
import { useAddTodoMutation } from "../../utils/firebase/firebase-utils";
import "./project-add.scss";

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const formattedDate = `${day}-${month}-${year} `;

function ProjectAdd() {
  //////////////////////////////////
  const childRef = useRef(null);
  const projectNameRef = useRef("");
  const deadLineRef = useRef("");
  const [button, setButton] = useState("Add Project");
  const [showHide, setShowHide] = useState("hide");
  const [addTodo] = useAddTodoMutation();
  /////////////////////////////////////////////////

  function onSaveProjectDetailsHandler(inputProjectDetails) {
    let projectData = {
      projectName: inputProjectDetails.projectName,
      startingDate: formattedDate,
      deadLine: inputProjectDetails.deadLine,
    };
    addTodo(projectData);
    ////calling refetch from projectList////
    const handleParentSubmit = () => {
      childRef.current.reFetch();
    };
    handleParentSubmit();
  }

  /////////////////////////////////////
  function showHideFunc() {
    if (button === "Add Project") {
      setShowHide("show");
    } else {
      setShowHide("hide");
    }
  }
  ////////////////////////

  function submitHandler(event) {
    event.preventDefault();
    if (showHide === "hide") {
      const projectDetails = {
        projectName: projectNameRef.current.value,
        startingDate: formattedDate,
        deadLine: deadLineRef.current.value,
      };

      onSaveProjectDetailsHandler(projectDetails);
      projectNameRef.current.value = "";
      // startingDateRef.current.value = "";
      deadLineRef.current.value = "";
    } else return;
  }
  //////////////////////////
  return (
    <>
      <form onSubmit={submitHandler} className="project-list">
        <div className="input-fields">
          <h4>Project Name</h4>
          <input
            className={showHide}
            required
            ref={projectNameRef}
            type="text"
            placeholder="Project name"
          />
        </div>
        <div className="input-fields">
          <h4>Starting date</h4>
          <h5 className={showHide}>{formattedDate}</h5>
        </div>
        <div className="input-fields">
          <h4>Dead Line</h4>
          <input
            className={showHide}
            ref={deadLineRef}
            type="text"
            placeholder="Dead line"
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
      <ProjectList
        ref={childRef}
        // projectDetails={projectDetails}
      />
    </>
  );
}

export default ProjectAdd;
