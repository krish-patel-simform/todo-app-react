import { useMemo, useState, type ChangeEvent } from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import type { Task } from "../../types/task.type";
import type { HeaderProps } from "./header.type";

import "./header.style.css";
import Modal from "../Modal/Modal";

const taskStatus = ["Select Priority", "High", "Medium", "Low"];

const initTask: Partial<Task> = { title: "" };

export default function Header({ onAdd, selectedStatus }: HeaderProps) {
  const [task, setTask] = useState<Partial<Task>>(initTask);

  const [showModal, setShowModal] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name: key, value } = e.target;
    console.log(name, value);
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(task);
  }
  const memoInputContainerStyle = useMemo(() => {
    return { flex: 1 };
  }, []);

  function handleClick() {
    setShowModal(true);
  }

  function onSave(newTask: Task) {
    onAdd(newTask);
  }

  function onClose() {
    setShowModal(false);
  }
  console.log("HEAD");

  return (
    <div className="header-container">
      {showModal ? (
        <Modal
          mode="New"
          header="Create New Task"
          onClose={onClose}
          onSave={onSave}
        />
      ) : null}
      <article>
        <h3>{selectedStatus} Tasks</h3>
      </article>

      <article className="header__task-actions">
        <Input
          value={task.title}
          type="text"
          name="title"
          placeHolder="Add new task..."
          onChange={handleChange}
          containerStyle={memoInputContainerStyle}
        />

        <Select
          name="priority"
          optionsList={taskStatus}
          onChange={handleChange}
        />

        <Button
          title="Add"
          leftIcon={<FaPlus />}
          onClick={handleClick}
          isPrimary={true}
        />
      </article>
    </div>
  );
}
