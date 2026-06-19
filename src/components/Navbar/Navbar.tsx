import NavLink from "../NavLink/NavLink";
import "./navbar.style.css";
import { FaCheckSquare } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { type PointerEvent } from "react";
import type { NavbarProps, NavbarStatus } from "./navbar.type";
import { useTheme } from "../../hook/usetheme";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteAllTodoAg } from "@/redux/feature/todo/todoSlice";

export default function Navbar({ status, onNavLinkClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  const todos = useAppSelector((store) => store.todo.todos);
  const dispatch = useAppDispatch();

  const completedTaskCount = todos.filter((todo) => todo.completed).length;

  const pendingTaskCount = todos.filter((todo) => !todo.completed).length;

  function handleNavlinkClick(e: PointerEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement;
    const newStatus = target.dataset.status as NavbarStatus;
    if (
      newStatus === "All" ||
      newStatus === "Pending" ||
      newStatus === "Completed" ||
      newStatus === "Notification"
    )
      onNavLinkClick(newStatus);
  }

  function handleDeleteAllTask() {
    dispatch(deleteAllTodoAg());
  }

  return (
    <div className="navbar-container">
      {/* Header */}
      <section className="header">
        {/* Icon */}
        <FaCheckSquare color="#806DF6" size={"1.5rem"} />
        <p className="header__heading">Todo App</p>
      </section>

      <section className="nav-link-container">
        <NavLink
          title="All task"
          dataStatus="All"
          leftIcon={<CiCircleList size={"1.2rem"} />}
          count={todos.length}
          isActive={status === "All"}
          onClick={handleNavlinkClick}
        />
        <NavLink
          title="Completed"
          dataStatus="Completed"
          leftIcon={<FaCheckSquare size={"1.2rem"} />}
          count={completedTaskCount}
          isActive={status === "Completed"}
          onClick={handleNavlinkClick}
        />
        <NavLink
          dataStatus="Pending"
          title="Pending"
          leftIcon={<IoMdTime size={"1.2rem"} />}
          count={pendingTaskCount}
          isActive={status === "Pending"}
          onClick={handleNavlinkClick}
        />
      </section>

      <section className="navbar__remmove-btn">
        <Button variant="primary" onClick={toggleTheme}>
          <CgDarkMode />
          <p>{theme}</p>
        </Button>

        <Button
          variant="outline"
          onClick={handleDeleteAllTask}
          className=" text-red-500 text-lg"
        >
          <MdDelete color="red" size={"1.2rem"} />
          <p>Clear All Tasks</p>
        </Button>
      </section>
    </div>
  );
}
