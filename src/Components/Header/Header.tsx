import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import type { Task } from "../../types/task.type";
import type { HeaderProps } from "./header.type";

import "./header.style.css";
import Modal from "../Modal/Modal";
import { DropDown } from "@/components/DropDown/DropDown";
import type { Option } from "@/components/DropDown/dropdown.type";
import { InputField } from "@/components/InputField/InputField";

const taskStatus: Option[] = [
  { label: "Select Priority", value: "select priority" },
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const initTask: Partial<Task> = { title: "" };

export default function Header({
  selectedStatus,
  dispatchAction,
}: HeaderProps) {
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

  function handleAddBtnClick() {
    setShowModal(true);
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
          // onSave={onSave}
          dispatchAction={dispatchAction}
        />
      ) : null}
      <article>
        <h3>{selectedStatus} Tasks</h3>
      </article>

      <article className="header__task-actions">
        {/* <Input
          value={task.title}
          type="text"
          name="title"
          placeHolder="Add new task..."
          onChange={handleChange}
          containerStyle={memoInputContainerStyle}
        /> */}

        <InputField
          label="Search Task"
          value={task.title}
          type="text"
          name="title"
          placeHolder="Search for task"
          onChange={handleChange}
        />

        {/* <Select
          name="priority"
          optionsList={taskStatus}
          onChange={handleChange}
        /> */}

        <DropDown
          label="Priority"
          options={taskStatus}
          onChange={handleChange}
        />

        <Button variant="primary" onClick={handleAddBtnClick}>
          <FaPlus />
          <p>Add</p>
        </Button>
      </article>
    </div>
  );
}
