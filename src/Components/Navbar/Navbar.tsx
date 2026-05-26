import NavLink from "../NavLink/NavLink";
import "./navbar.style.css";
import { FaCheckSquare } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Button from "../Button/Button";
import { useMemo, type PointerEvent } from "react";
import type { NavbarProps } from "./navbar.type";

export default function Navbar({
  onNavLinkClick,
  status,
  allTaskCount,
  completedTaskCount,
  pendingTaskCount,
}: NavbarProps) {
  const memoRemoveBtnStyle = useMemo(() => {
    return { background: "none", color: "red", fontSize: "1.2rem" };
  }, []);

  function handleNavlinkClick(e: PointerEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement;
    const newStatus = target.dataset.status;
    if (
      newStatus === "All" ||
      newStatus === "Pending" ||
      newStatus === "Completed"
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
      </section>

      <section className="navbar__remmove-btn">
        <Button
          title="Clear All Tasks"
          leftIcon={<MdDelete color="red" size={"1.2rem"} />}
          style={memoRemoveBtnStyle}
        />
      </section>
    </div>
  );
}
