import "./project-page.scss";
import { db } from "../../utils/firebase/firebase-utils";
import { collection, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

import { useState, useContext, useEffect } from "react";
import ProjectAdd from "../projectAdd-field/project-add";
import ProjectField from "../projectField/projectField";
import {
  // ProjectsContext,/
  UserContext,
  // updateProjectsContext,
} from "../../contexts/context";

import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../utils/firebase/firebase-utils";

function ProjectPage() {
  const [projectDetails, setProjectDetails] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userId, setUserId] = useState(false);
  // const { currentProject } = useContext(ProjectsContext);
  // const { setUpdateCurrentProjects } = useContext(updateProjectsContext);
  const [rerender, setRerender] = useState(1);

  /////////////////////////////////////////////
  // const [newTodo, setNewTodo] = useState("");
  // console.log(rerender);
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    // refetch,
  } = useGetTodosQuery(currentUser, {
    skip: !currentUser, // Enable the query when userId is truthy
  });

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  let content;
  // Define conditional content
  if (isLoading) {
    // console.log("loading");
  }
  if (isSuccess) {
    // console.log("succes");
  } else if (isError) {
    console.log("error", error);
  }

  const todosQuery = useGetTodosQuery();

  /////////////////////////////////////////////

  useEffect(() => {
    console.log(projects);
  }, [todosQuery]);

  useEffect(() => {
    if (currentUser && projects) {
      setUserId(currentUser.uid);

      let arr = [];
      for (let i = 0; i < projects.documents.length; i++) {
        // console.log("useEffect Rerender");
        const obj = {
          deadLine: projects.documents[i]?.fields?.deadLine?.stringValue || "",
          projectId:
            projects.documents[i]?.fields?.projectId?.stringValue || "",
          projectName:
            projects.documents[i]?.fields?.projectName?.stringValue || "",
          startingDate:
            projects.documents[i]?.fields?.startingDate?.stringValue || "",
        };
        arr.push(obj);
      }
      setProjectDetails(arr);
    }
  }, [currentUser, projects]);
  //////////////////////////////////////////////////
  useEffect(() => {
    if (!currentUser) {
      setProjectDetails([]);
    }
  }, [currentUser]);
  ///////////////////////////////////////////////////////

  function onSaveProjectDetailsHandler(inputProjectDetails) {
    let projectData = {
      projectName: inputProjectDetails.projectName,
      startingDate: inputProjectDetails.startingDate,
      deadLine: inputProjectDetails.deadLine,
    };

    // setRerender(rerender + 1);

    addTodo(projectData);
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
        deleteProject={deleteTodo}
      />
      {/* <button onClick={createProject}>Create Project</button> */}
    </div>
  );
}

export default ProjectPage;
