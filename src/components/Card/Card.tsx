import "./card.style.css";
import "./card.type";
import { MdDelete, MdEdit } from "react-icons/md";
import { memo } from "react";
import type { CardProps } from "./card.type";
import type { Task } from "../../types/task.type";
import { CheckboxField } from "../CheckboxField/CheckboxField";

function Card({ task, onModalOpen, dispatchAction }: CardProps & {}) {
  // const memoInputContainerStyle = useMemo(() => {
  //   return { border: "none" };
  // }, []);

  console.log("Card is re render");

  function handleEditBtnClick() {
    onModalOpen(task);
  }

  function handleDeleteBtnClick() {
    dispatchAction({ type: "delete", payload: task.id });
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
        <CheckboxField
          checked={task.status === "Completed" ? true : false}
          title={task.title}
          onCheckedChange={handleCheckboxChanged}
        />
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
