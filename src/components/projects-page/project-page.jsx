import "./project-page.scss";
import { db } from "../../utils/firebase/firebase-utils";
import { collection, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

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
  const [rerender, setRerender] = useState(1);

  console.log(projectDetails);
  async function deleteProject(projectId) {
    console.log(projectId);
    try {
      const projectDocRef = doc(db, `users/${userId}/projects/${projectId}`);
      await deleteDoc(projectDocRef);

      setUpdateCurrentProjects("delete");
      setRerender(rerender + 1);
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

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
        projectId: e.projectId,
        projectName: e.projectName,
        startingDate: e.startingDate,
        deadLine: e.deadLine,
      }))
    );
    setCurrentUser(currentUser);
  }

  function onSaveProjectDetailsHandler(inputProjectDetails) {
    const createProject = async () => {
      try {
        let projectData = {
          projectName: inputProjectDetails.projectName,
          startingDate: inputProjectDetails.startingDate,
          deadLine: inputProjectDetails.deadLine,
        };

        // Add the project data to the "projects" collection in Firestore

        const docRef = await addDoc(
          collection(db, `users/${userId}/projects`),
          projectData
        );

        const projectDataWithId = {
          ...projectData,
          projectId: docRef.id,
        };
        const projectDocRef = await doc(
          db,
          `users/${userId}/projects/${docRef.id}`
        );

        setDoc(projectDocRef, projectDataWithId);

        // setProjectId(docRef.id);
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
      <ProjectField
        projectDetails={projectDetails}
        deleteProject={deleteProject}
      />
      {/* <button onClick={createProject}>Create Project</button> */}
    </div>
  );
}

export default ProjectPage;
