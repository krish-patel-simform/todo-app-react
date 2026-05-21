import NavLink from "../NavLink/NavLink";
import "./navbar.style.css";
import { FaCheckSquare } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Button from "../Button/Button";
import { useMemo, useState } from "react";
import type { TaskStatus } from "../../types/task.type";

export default function Navbar() {
  const memoRemoveBtnStyle = useMemo(() => {
    return { background: "none", color: "red", fontSize: "1.2rem" };
  }, []);

  const [activeType, setActiveType] = useState<TaskStatus>("All");

  function handleNavlinkClick(newType: TaskStatus) {
    setActiveType(newType);
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
          leftIcon={<CiCircleList size={"1.2rem"} />}
          count={5}
          isActive={activeType === "All" ? true : false}
          onClick={() => {
            handleNavlinkClick("All");
          }}
        />
        <NavLink
          title="Completed"
          leftIcon={<FaCheckSquare size={"1.2rem"} />}
          count={5}
          isActive={activeType === "Completed" ? true : false}
          onClick={() => {
            handleNavlinkClick("Completed");
          }}
        />
        <NavLink
          title="Pending"
          leftIcon={<IoMdTime size={"1.2rem"} />}
          count={5}
          isActive={activeType === "Pending" ? true : false}
          onClick={() => {
            handleNavlinkClick("Pending");
          }}
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
