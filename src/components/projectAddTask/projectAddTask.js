import "./projectAddTask.scss";
import { X, CheckButton } from "../../assets/icons.jsx";
import { useState, useRef } from "react";
import {
  useGetTasksQuery,
  useAddTaskMutation,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  useDeleteTodoMutation,
=======
  useDeleteTaskMutation,
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
  useDeleteTaskMutation,
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
  useDeleteTaskMutation,
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
  useUpdateTodoMutation,
} from "../../utils/firebase/firebase-utils";

const ProjectAddTask = (props) => {
  const [showHide, setShowHide] = useState(false);
  const [taskForm, setTaskForm] = useState(false);
  const loremText = "Here in this field you can describe your task";
  const taskNameRef = useRef("");
  const taskDescription = useRef("");

  const { data: tasks, isSuccess, refetch } = useGetTasksQuery(props.projectId);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

  const [addTask] = useAddTaskMutation();
=======
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631

  const saveTaskDataHandler = async () => {
    const taskData = {
      taskName: taskNameRef.current.value,
      taskDescription: taskDescription.current.value,
      projectId: props.projectId,
    };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(taskData);
    refetch();
    await addTask(taskData);
    taskNameRef.current.value = "";
    taskDescription.current.value = "";
  };

  const addTaskInputFields = () => {
    console.log(props.projectId);
=======
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
    await addTask(taskData);
    refetch();
  };

  const addTaskInputFields = () => {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
    const projectTasks = tasks.filter(
      (task) => task.taskprojectId === props.projectId
    );

    if (!taskForm) {
      return (
        <>
          {projectTasks.map((task) => {
            return (
              <div className="taskBlock" key={task.taskId}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                <h4>{task.taskName}</h4>
                <p>{task.taskDescription}</p>
                <h4>Send to ...</h4>;
=======
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
                <div className="taskBlockHeader">
                  <h4>{task.taskName}</h4>
                  <div
                    onClick={() => {
                      deleteTask(task);
                    }}
                  >
                    <X></X>
                  </div>
                </div>
                <p>{task.taskDescription}</p>
                <h4>Send to ...</h4>
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <div className="taskBlock">
          <input
            className="taskNameInput"
            ref={taskNameRef}
            type="text"
            placeholder="Task name"
            onFocus={(e) => (e.target.value = "")}
            required
          />
          <input
            className="taskDescriptionInput"
            ref={taskDescription}
            type="text"
            placeholder="Task description here ..."
            onFocus={(e) => (e.target.value = "")}
          />
          <div
            className="taskSave"
            onClick={() => {
              saveTaskDataHandler();
              setTaskForm(false);
            }}
          >
            <CheckButton />
          </div>
        </div>
      );
    }
  };

  const popup = () => {
    if (showHide)
      return (
        <div className="projectAddTask">
          <header className="taskHeader">
            <h3>Project Name</h3>
            <h3>Starting Date</h3>
            <h3>Dead Line</h3>
            <div
              onClick={() => {
                setShowHide((prevShowHide) => !prevShowHide);
              }}
            >
              <X />
            </div>
          </header>
          <button
            onClick={() => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              setTaskForm(true);
=======
              setTaskForm((prev) => !prev);
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
              setTaskForm((prev) => !prev);
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
=======
              setTaskForm((prev) => !prev);
>>>>>>> ea9716577c67a6cf0b16b19e0fbbedda11051631
              // addTaskInputFields();
            }}
          >
            Add task
          </button>
          <div className="taskContainer">{addTaskInputFields()}</div>
        </div>
      );
  };
  /////////////////////////////////////////////////////////
  return (
    <>
      <h5
        onClick={() => {
          setShowHide((prevShowHide) => !prevShowHide);
        }}
      >
        Add tasks
      </h5>
      {popup()}
    </>
  );
};
export default ProjectAddTask;
