import Navbar from "../../components/Navbar/Navbar";
import "./dshboard.style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task } from "../../types/task.type";
import {
  checkAllTaskForNotification,
  checkNotificationPermission,
  saveTask,
} from "../../utils/dashboard.utils";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import type { NavbarStatus } from "../../components/Navbar/navbar.type";
import Notification from "../../components/Notification/Notification";
import { useAllTaskList } from "../../hook/useAllTaskList";

export default function DashboardPage() {
  const { allTaskList, dispatchAllTaskList } = useAllTaskList();

  const [selectedStatus, setSelectedStatus] = useState<NavbarStatus>("All");

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

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
    setTask(null);
  }

  function handleDeleteAllTask() {
    dispatchAllTaskList({ type: "deleteAll" });
  }

  return (
    <div className="dashboard-container">
      {showModal && (
        <Modal
          mode="Edit"
          header="Edit Task"
          defaultTask={task as Required<Task>}
          onClose={handleCloseModal}
          dispatchAction={dispatchAllTaskList}
        />
      )}
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
