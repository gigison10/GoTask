import "./projectList.scss";
import {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../utils/firebase/firebase-utils";
import { UserContext } from "../../contexts/context";

function ProjectList(props, ref) {
  const { currentUserId, setCurrentUserId } = useContext(UserContext);
  const [projectDetails, setProjectDetails] = useState([]);
  const [currentProject, setCurrentProject] = useState([]);
  const [editProjectId, setEditProjectId] = useState(null);
  const projectNameRef = useRef("");
  const projectStartingDateRef = useRef("");
  const projectDeadLineRef = useRef("");
  //////////////////////////////////
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetTodosQuery(currentUserId, {
    skip: !currentUserId, // Enable the query when userId is truthy
  });
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  /////////////////////////////////////////////

  useEffect(() => {
    if (currentUserId && projects && isSuccess) {
      // setUserId(currentUserId.uid);
      const arr = projects?.documents?.map((project) => {
        const { deadLine, projectId, projectName, startingDate } =
          project?.fields || {};

        return {
          deadLine: deadLine?.stringValue || "",
          projectId: projectId?.stringValue || "",
          projectName: projectName?.stringValue || "",
          startingDate: startingDate?.stringValue || "",
        };
      });

      setProjectDetails(arr);
    }
    if (!currentUserId) {
      setProjectDetails([]);
    }
  }, [currentUserId, projects]);

  ////refetching after add a new project from parent component///////////
  function reFetch() {
    setTimeout(() => {
      refetch();
    }, 400);
  }
  useImperativeHandle(ref, () => ({
    reFetch,
  }));
  ///////////////////////////////////

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEditClick(editProjectId);
    }
  };

  const editField = (data, inputField, ref) => {
    if (data.projectId === editProjectId) {
      return (
        <input
          className="inputProjectField"
          autoFocus
          type="text"
          defaultValue={inputField}
          ref={ref}
          onKeyDown={handleKeyDown}
        />
      );
    } else {
      return <h5>{inputField}</h5>;
    }
  };

  const isEditing = (projectId) => projectId === editProjectId;

  const handleEditClick = (projectId) => {
    if (isEditing(projectId)) {
      updateTodo({
        id: editProjectId,
        projectName: projectNameRef.current.value,
        deadLine: projectDeadLineRef.current.value,
        startingDate: projectStartingDateRef.current.value,
      })
        .then((response) => {
          // Handle the success response if needed
          console.log(response);
          setEditProjectId(null);
        })
        .catch((error) => {
          // Handle the error if needed
        });
      reFetch();
    } else {
      setEditProjectId(projectId);
    }
  };

  ////////////////////////////////
  return (
    <Fragment>
      {projectDetails?.map((data) => (
        <div className="project-field" key={data.projectId}>
          <div type="submit" className="checkBlock">
            <input className="check" type="checkbox" />
            <button
              className="deteButton"
              onClick={() => deleteTodo(data.projectId)}
            >
              delete
            </button>
          </div>
          {editField(data, data.projectName, projectNameRef)}
          {editField(data, data.startingDate, projectStartingDateRef)}
          {editField(data, data.deadLine, projectDeadLineRef)}
          <h5>In progress</h5>
          <button
            className="buttonField"
            value={data.id}
            onClick={() => {
              setCurrentProject(data);
              setEditProjectId(data.projectId);
              if (isEditing(data.projectId)) {
                handleEditClick(data.projectId);
              }
            }}
          >
            {isEditing(data.projectId) ? "Save" : "Edit"}
          </button>
          <button className="buttonField">Mark as complete</button>
        </div>
      ))}
    </Fragment>
  );
}

export default forwardRef(ProjectList);
