import "./card.style.css";
import "./card.type";
import Input from "../Input/Input";
import { MdDelete, MdEdit } from "react-icons/md";
import { memo, useMemo } from "react";
import type { CardProps } from "./card.type";
import type { Task } from "../../types/task.type";

function Card({ task, onModalOpen, dispatchAction }: CardProps & {}) {
  const memoInputContainerStyle = useMemo(() => {
    return { border: "none" };
  }, []);

  const memoInputStyle = useMemo(() => {
    return { accentColor: `var(--primary-color)` };
  }, []);

  console.log("Card is re render");

  function handleEditBtnClick() {
    onModalOpen(task);
  }

  function handleDeleteBtnClick() {
    dispatchAction({ type: "deleteAll" });
  }

  function handleCheckboxChanged() {
    const updatedTask: Task = {
      ...task,
      status: task.status == "Completed" ? "Pending" : "Completed",
    };

    // assume have an dispatch
    dispatchAction({ type: "edit", payload: updatedTask });

    // onChecked(task);
  }

  return (
    <div className="card-container">
      <section className="card__section">
        {/* Checkbox */}
        <Input
          type="checkbox"
          containerStyle={memoInputContainerStyle}
          style={memoInputStyle}
          checked={task.status === "Completed" ? true : false}
          onChange={handleCheckboxChanged}
        />
        <p className="">{task.title}</p>
      </section>

      <section className="card__section">
        <p
          className={`${task.status == "Completed" ? "card__actions__status-green" : "card__actions__status-orange"} `}
        >
          {task.status}
        </p>
        <MdEdit color="blue" onClick={handleEditBtnClick} cursor={"pointer"} />
        <MdDelete
          color="red"
          onClick={handleDeleteBtnClick}
          cursor={"pointer"}
        />
      </section>
    </div>
  );
}

export default memo(Card);
