import "./card.style.css";
import "./card.type";
import { MdDelete, MdEdit } from "react-icons/md";
import { memo } from "react";
import type { CardProps } from "./card.type";
import { CheckboxField } from "../CheckboxField/CheckboxField";
import type { Task } from "@/redux/feature/todo/todoSlice.type";
import { useAppDispatch } from "@/redux/store";
import { deleteTodoAg, updateTodoAg } from "@/redux/feature/todo/todoSlice";

function Card({ task, onModalOpen }: CardProps & {}) {
  const dispatch = useAppDispatch();

  console.log("Card is re render");

  function handleEditBtnClick() {
    onModalOpen(task);
  }

  function handleDeleteBtnClick() {
    dispatch(deleteTodoAg(task.id));
  }

  function handleCheckboxChanged() {
    const updatedTask: Task = {
      ...task,
      completed: !task.completed,
    };
    dispatch(updateTodoAg(updatedTask));
  }

  return (
    <div className="card-container">
      <section className="card__section">
        <CheckboxField
          checked={task.completed ? true : false}
          title={task.todo}
          onCheckedChange={handleCheckboxChanged}
        />
      </section>

      <section className="card__section">
        <p
          className={`${task.completed ? "card__actions__status-green" : "card__actions__status-orange"} `}
        >
          {task.completed ? "Completed" : "Pending"}
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
