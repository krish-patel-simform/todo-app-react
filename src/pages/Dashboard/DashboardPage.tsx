import Navbar from "../../Components/Navbar/Navbar";
import "./dshboard.style.css";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { Task } from "../../types/task.type";
import {
  checkAllTaskForNotification,
  checkNotificationPermission,
  getStoredTask,
  saveTask,
} from "../../utils/dashboard.utils";
import Card from "../../Components/Card/Card";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import type { NavbarStatus } from "../../Components/Navbar/navbar.type";
import Notification from "../../Components/Notification/Notification";

type AllTaskListState = Task[];

export type AllTaskListAction =
  | { type: "insert"; payload: Task }
  | { type: "delete"; payload: string }
  | { type: "edit"; payload: Task }
  | { type: "deleteAll" };

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
    case "deleteAll": {
      return [];
    }
  }
}

export default function DashboardPage() {
  const [allTaskList, dispatchAllTaskList] = useReducer(
    allTaskListReducer,
    undefined,
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

  function handleCloseModal() {
    setShowModal(false);
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
          dispatchAction={dispatchAllTaskList}
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
            <Header
              selectedStatus={selectedStatus}
              dispatchAction={dispatchAllTaskList}
            />

            <article>
              {/* TaskList Container */}
              {filterTaskList.map((taskData) => (
                <Card
                  task={taskData}
                  key={taskData.id}
                  onModalOpen={memoShowModal}
                  dispatchAction={dispatchAllTaskList}
                />
              ))}
            </article>
          </>
        )}
      </main>
    </div>
  );
}
