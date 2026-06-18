import Navbar from "../../components/Navbar/Navbar";
import "./dshboard.style.css";
import { useCallback, useMemo, useState } from "react";
import type { Task } from "../../types/task.type";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import type { NavbarStatus } from "../../components/Navbar/navbar.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteTodo } from "@/redux/feature/todo/todoAsync";

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

  const filterTaskList = useMemo(() => {
    switch (selectedStatus) {
      case "Completed":
      case "Pending":
        return allTaskList.filter((task) => task.status === selectedStatus);

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
    dispatch(deleteTodo(1));
  }

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
      </main>
    </div>
  );
}
