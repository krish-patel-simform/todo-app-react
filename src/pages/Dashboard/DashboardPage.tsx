import Navbar from "../../components/Navbar/Navbar";
import "./dshboard.style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import type { NavbarStatus } from "../../components/Navbar/navbar.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchTodos } from "@/redux/feature/todo/todoAsync";
import type { Task } from "@/redux/feature/todo/todoSlice.type";

export default function DashboardPage() {
  const {
    error,
    loading,
    todos: allTaskList,
  } = useAppSelector((store) => store.todo);

  const dispatch = useAppDispatch();

  const [selectedStatus, setSelectedStatus] = useState<NavbarStatus>("All");

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filterTaskList = useMemo(() => {
    switch (selectedStatus) {
      case "Completed":
        return allTaskList.filter((task) => task.completed);
      case "Pending":
        return allTaskList.filter((task) => !task.completed);

      default:
        return allTaskList;
    }
  }, [allTaskList, selectedStatus]);

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
    // dispatchAllTaskList({ type: "deleteAll" });
  }

  console.log("dashboard render");

  if (loading) return <h6>Loading...</h6>;
  else if (error) {
    console.error("Error in the fetching all todos");
    return <h6>{error}</h6>;
  }
  return (
    <div className="dashboard-container">
      {showModal && (
        <Modal
          mode="Edit"
          header="Edit Task"
          defaultTask={task as Required<Task>}
          onClose={handleCloseModal}
        />
      )}
      <section className="dashboard__nav-container">
        <Navbar
          onNavLinkClick={handleNavLinkChange}
          status={selectedStatus}
          completedTaskCount={
            allTaskList.filter((task) => task.completed).length
          }
          pendingTaskCount={
            allTaskList.filter((task) => !task.completed).length
          }
          allTaskCount={allTaskList.length}
          onDeleteAllTask={handleDeleteAllTask}
        />
      </section>

      <main className="dashboard__main-container">
        <>
          <Header selectedStatus={selectedStatus} />

          <article className="dashboard__main-task-container">
            {filterTaskList.map((taskData) => (
              <Card
                task={taskData}
                key={taskData.id}
                onModalOpen={memoShowModal}
              />
            ))}
          </article>
        </>
      </main>
    </div>
  );
}
