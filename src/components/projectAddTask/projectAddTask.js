import "./projectAddTask.scss";
import { X, CheckButton } from "../../assets/icons.jsx";
import { useState, useRef } from "react";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../utils/firebase/firebase-utils";

const ProjectAddTask = (props) => {
  const [showHide, setShowHide] = useState(false);
  const [taskForm, setTaskForm] = useState(false);
  const loremText = "Here in this field you can describe your task";
  const taskNameRef = useRef("");
  const taskDescription = useRef("");

  const { data: tasks, isSuccess, refetch } = useGetTasksQuery(props.projectId);

  const [addTask] = useAddTaskMutation();

  const saveTaskDataHandler = async () => {
    const taskData = {
      taskName: taskNameRef.current.value,
      taskDescription: taskDescription.current.value,
      projectId: props.projectId,
    };
    console.log(taskData);
    refetch();
    await addTask(taskData);
    taskNameRef.current.value = "";
    taskDescription.current.value = "";
  };

  const addTaskInputFields = () => {
    console.log(props.projectId);
    const projectTasks = tasks.filter(
      (task) => task.taskprojectId === props.projectId
    );

    if (!taskForm) {
      return (
        <>
          {projectTasks.map((task) => {
            return (
              <div className="taskBlock" key={task.taskId}>
                <h4>{task.taskName}</h4>
                <p>{task.taskDescription}</p>
                <h4>Send to ...</h4>;
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
              setTaskForm(true);
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
