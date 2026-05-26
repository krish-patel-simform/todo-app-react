import Navbar from "../../Components/Navbar/Navbar";
import "./dshboard.style.css";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { Task, TaskStatus } from "../../types/task.type";
import {
  fillDefaultTaskProperty,
  saveTask,
  validate,
} from "../../utils/dashboard.utils";
import Card from "../../Components/Card/Card";
import EditModal from "../../Components/Modal/EditModal";
import Header from "../../Components/Header/Header";

const defaultdata: Task[] = [
  {
    id: "1",
    title: "Complete Todo App",
    status: "Completed",
    priority: "Low",
    date: new Date(),
  },
  {
    id: "3",
    title: "Complete Portfolio website",
    status: "Pending",
    priority: "Medium",
    date: new Date(),
  },
  {
    id: "4",
    title: "Complete Color pallate",
    status: "Completed",
    priority: "High",
    date: new Date(),
  },
  {
    id: "5",
    title: "Complete some other website",
    status: "Pending",
    priority: "High",
    date: new Date(),
  },
];

type AllTaskListState = Task[];

type AllTaskListAction = {
  type: "insert" | "delete" | "edit" | "changeStatus";
  payload: unknown;
};

function allTaskListReducer(
  prevState: AllTaskListState,
  action: AllTaskListAction,
): AllTaskListState {
  switch (action.type) {
    case "insert": {
      console.log("btn clicked");
      const task = action.payload as Task;
      const isValid = validate(task);
      console.log(isValid);
      if (!isValid) {
        alert("Enter title or select the priority");
        return prevState;
      }
      const newTask: Task = { ...task, ...fillDefaultTaskProperty() };
      const newTaskList = [...prevState, newTask];
      return newTaskList;
    }
    case "edit": {
      const editedTask = action.payload as Task;
      const updatedTaskIndex = prevState.findIndex(
        (task) => task.id === editedTask.id,
      );

      const prefixArray = prevState.slice(0, updatedTaskIndex);
      const suffixArray = prevState.slice(updatedTaskIndex + 1);

      return [...prefixArray, editedTask, ...suffixArray];
    }
    case "delete": {
      const id = action.payload;
      return prevState.filter((task) => task.id !== id);
    }
    case "changeStatus": {
      const currentTask = action.payload as Task;
      const updatedTask: Task = {
        ...currentTask,
        status: currentTask.status === "Completed" ? "Pending" : "Completed",
      };

      const updateTaskIndex = prevState.findIndex(
        (task) => task.id === currentTask.id,
      );

      const prefixArray = prevState.slice(0, updateTaskIndex);
      const sufixArray = prevState.slice(updateTaskIndex + 1);

      return [...prefixArray, updatedTask, ...sufixArray];
    }
  }
}

export default function DashboardPage() {
  const [allTaskList, dispatchAllTaskList] = useReducer(
    allTaskListReducer,
    defaultdata,
  );
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "All">(
    "All",
  );

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState<Partial<Task>>({ title: "" });

  const filterTaskList = useMemo(() => {
    switch (selectedStatus) {
      case "Completed":
      case "Pending":
        return allTaskList.filter((task) => task.status === selectedStatus);

      default:
        return allTaskList;
    }
  }, [allTaskList, selectedStatus]);

  console.log(allTaskList);

  useEffect(() => {
    console.log("task is saved");
    saveTask(allTaskList);
  }, [allTaskList]);

  function handleNavLinkChange(status: TaskStatus | "All") {
    setSelectedStatus(status);
  }

  // edit the task show modal
  const memoShowModal = useCallback((currentTask: Task) => {
    console.log(currentTask);
    setTask(currentTask);
    setShowModal(true);
  }, []);

  // delete the task
  const memoDeleteTask = useCallback((id: string) => {
    dispatchAllTaskList({ type: "delete", payload: id });
  }, []);

  const memoOnCheckboxChecked = useCallback((currentTask: Task) => {
    dispatchAllTaskList({ type: "changeStatus", payload: currentTask });
  }, []);

  function handleAddBtnClick(task: Partial<Task>) {
    dispatchAllTaskList({ type: "insert", payload: task });
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleSaveEditedTask(editedTask: Task) {
    dispatchAllTaskList({ type: "edit", payload: editedTask });
  }

  return (
    <div className="dashboard-container">
      {showModal ? (
        <EditModal
          task={task as Required<Task>}
          onClose={handleCloseModal}
          onSave={handleSaveEditedTask}
        />
      ) : null}
      <section className="dashboard__nav-container">
        <Navbar
          onNavLinkClick={handleNavLinkChange}
          status={selectedStatus}
          completedTaskCount={
            allTaskList.filter((task) => task.status === "Completed").length
          }
          pendingTaskCount={
            allTaskList.filter((task) => task.status === "Pending").length
          }
          allTaskCount={allTaskList.length}
        />
      </section>

      <section className="dashboard__task-list-container">
        {/* header */}
        <Header onAdd={handleAddBtnClick} />

        <article>
          {/* TaskList Container */}
          {filterTaskList.map((taskData) => (
            <Card
              task={taskData}
              key={taskData.id}
              onChecked={memoOnCheckboxChecked}
              onDelete={memoDeleteTask}
              onModalOpen={memoShowModal}
            />
          ))}
        </article>
      </section>
    </div>
  );
}
