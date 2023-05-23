import "./project-page.scss";
import { db } from "../../utils/firebase/firebase-utils";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

import { useState, useContext, useEffect } from "react";
import ProjectAdd from "../projectAdd-field/project-add";
import ProjectField from "../projectField/projectField";
import {
  ProjectsContext,
  UserContext,
  updateProjectsContext,
} from "../../contexts/context";

function ProjectPage() {
  const [projectDetails, setProjectDetails] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userId, setUserId] = useState("");
  const { currentProject } = useContext(ProjectsContext);
  const { setUpdateCurrentProjects } = useContext(updateProjectsContext);

  let [rerender, setRerender] = useState(1);

  useEffect(() => {
    userCheck();
  }, [currentUser, rerender]);

  function userCheck() {
    if (currentUser) {
      setTimeout(() => {
        getProjects();
        setUserId(currentUser.uid);
      }, "1500");
    } else {
      setProjectDetails([]);
      return;
    }
  }

  function getProjects() {
    setProjectDetails(
      currentProject.map((e) => ({
        id: Math.random().toString(),
        name: e.projectName,
        date: e.startingDate,
        deadLine: e.deadLine,
      }))
    );
    setCurrentUser(currentUser);
  }

  function onSaveProjectDetailsHandler(inputProjectDetails) {
    const createProject = async () => {
      try {
        const projectData = {
          projectName: inputProjectDetails.projectName,
          startingDate: inputProjectDetails.startingDate,
          deadLine: inputProjectDetails.deadLine,
        };
        // Add the project data to the "projects" collection in Firestore
        const docRef = await addDoc(
          collection(db, `users/${userId}/projects`),
          projectData
        );

        setUpdateCurrentProjects(docRef.id);
        setRerender(rerender + 1);

        // console.log("Project ID:", docRef.id);
      } catch (error) {
        console.error("Error creating project:", error);
      }
    };
    createProject();
  }

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
      {/* <button onClick={createProject}>Create Project</button> */}
    </div>
  );
}

export default ProjectPage;
