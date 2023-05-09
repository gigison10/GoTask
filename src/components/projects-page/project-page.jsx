import "./project-page.scss";
import { useState } from "react";
import ProjectAdd from "../projectAdd-field/project-add";
import ProjectField from "../projectField/projectField";

function ProjectPage() {
  const [projectDetails, setProjectDetails] = useState([]);

  const onSaveProjectDetailsHandler = (inputProjectDetails) => {
    setProjectDetails((prevDetails) => [
      ...prevDetails,
      {
        ...inputProjectDetails,
        id: Math.random().toString(),
      },
    ]);
  };
  // console.log(...projectDetails);
  return (
    <div className="project-container">
      <div className="project-menu">
        <div>sort by</div>
        <div>sort by</div>
        <div>sort by</div>
        <div>something</div>
        {/* <div className="button">Add project</div> */}
      </div>
      <ProjectAdd onSaveProjectDetails={onSaveProjectDetailsHandler} />
      <ProjectField projectDetails={projectDetails} />
    </div>
  );
}

export default ProjectPage;
