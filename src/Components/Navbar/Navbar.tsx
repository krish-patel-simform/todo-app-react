import NavLink from "../NavLink/NavLink";
import "./navbar.style.css";
import { FaCheckSquare } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { IoMdTime, IoMdNotificationsOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { useMemo, type PointerEvent } from "react";
import type { NavbarProps } from "./navbar.type";
import { useTheme } from "../../hook/usetheme";

export default function Navbar({
  onNavLinkClick,
  status,
  allTaskCount,
  completedTaskCount,
  pendingTaskCount,
  onDeleteAllTask,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  const memoRemoveBtnStyle = useMemo(() => {
    return { background: "none", color: "red", fontSize: "1.2rem" };
  }, []);

  function handleNavlinkClick(e: PointerEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement;
    const newStatus = target.dataset.status;
    if (
      newStatus === "All" ||
      newStatus === "Pending" ||
      newStatus === "Completed" ||
      newStatus === "Notification"
    )
      onNavLinkClick(newStatus);
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
          count={allTaskCount}
          isActive={status === "All" ? true : false}
          onClick={handleNavlinkClick}
        />
        <NavLink
          title="Completed"
          dataStatus="Completed"
          leftIcon={<FaCheckSquare size={"1.2rem"} />}
          count={completedTaskCount}
          isActive={status === "Completed" ? true : false}
          onClick={handleNavlinkClick}
        />
        <NavLink
          dataStatus="Pending"
          title="Pending"
          leftIcon={<IoMdTime size={"1.2rem"} />}
          count={pendingTaskCount}
          isActive={status === "Pending" ? true : false}
          onClick={handleNavlinkClick}
        />
        <NavLink
          dataStatus="Notification"
          title="Notification"
          onClick={handleNavlinkClick}
          isActive={status === "Notification" ? true : false}
          leftIcon={<IoMdNotificationsOutline />}
        />
      </section>

      <section className="navbar__remmove-btn">
        {/* <Button
          isPrimary={true}
          title={theme}
          onClick={toggleTheme}
          leftIcon={<CgDarkMode />}
        />
        <Button
          isPrimary={false}
          title="Clear All Tasks"
          leftIcon={<MdDelete color="red" size={"1.2rem"} />}
          onClick={onDeleteAllTask}
          style={memoRemoveBtnStyle}
        /> */}

        <Button variant="primary" onClick={toggleTheme}>
          <CgDarkMode />
          <p>{theme}</p>
        </Button>

        <Button
          variant="secondary"
          onClick={onDeleteAllTask}
          style={memoRemoveBtnStyle}
        >
          <MdDelete color="red" size={"1.2rem"} />
          <p>Clear All Tasks</p>
        </Button>
      </section>
    </div>
  );
}
