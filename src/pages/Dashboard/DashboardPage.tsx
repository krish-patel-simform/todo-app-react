import Navbar from "../../Components/Navbar/Navbar";
import "./dshboard.style.css";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { Task } from "../../types/task.type";
import {
  checkAllTaskForNotification,
  checkNotificationPermission,
  deleteAllTask,
  getStoredTask,
  saveTask,
} from "../../utils/dashboard.utils";
import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import type { NavbarStatus } from "../../Components/Navbar/navbar.type";
import Notification from "../../Components/Notification/Notification";

type AllTaskListState = Task[];

type AllTaskListAction = {
  type: "insert" | "delete" | "edit" | "changeStatus" | "deleteAll";
  payload?: unknown;
};

function allTaskListReducer(
  prevState: AllTaskListState,
  action: AllTaskListAction,
): AllTaskListState {
  switch (action.type) {
    case "insert": {
      console.log("btn clicked");
      const newTask = action.payload as Task;
      console.log(prevState);
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
    case "deleteAll": {
      deleteAllTask();
      return [];
    }
  }
}

export default function DashboardPage() {
  const [allTaskList, dispatchAllTaskList] = useReducer(
    allTaskListReducer,
    [],
    getStoredTask,
  );
  const [selectedStatus, setSelectedStatus] = useState<NavbarStatus>("All");

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

  useEffect(() => {
    async function checkNotifyRequestAndSendNotification() {
      const granted = await checkNotificationPermission();
      if (!granted) return;
      checkAllTaskForNotification(allTaskList);
    }
    checkNotifyRequestAndSendNotification();
    console.log("task is saved");
    saveTask(allTaskList);
  }, [allTaskList]);

  function handleNavLinkChange(status: NavbarStatus) {
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

  function handleDeleteAllTask() {
    dispatchAllTaskList({ type: "deleteAll" });
  }

  return (
    <div className="dashboard-container">
      {showModal ? (
        <Modal
          mode="Edit"
          header="Edit Task"
          defaultTask={task as Required<Task>}
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
          onDeleteAllTask={handleDeleteAllTask}
        />
      </section>

      <main className="dashboard__main-container">
        {selectedStatus === "Notification" ? (
          <Notification allTask={allTaskList} />
        ) : (
          <>
            <Header onAdd={handleAddBtnClick} selectedStatus={selectedStatus} />

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
          </>
        )}
      </main>
    </div>
  );
}
