import "./modal.style.css";
import Input from "../Input/Input";
import type { TaskPriority, TaskStatus } from "../../types/task.type";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { FaSave } from "react-icons/fa";
import type { EditModalProps } from "./editModal.type";
import { useState, type ChangeEvent } from "react";

export default function EditModal({
  task: taskFromProp,
  onClose,
  onSave,
}: EditModalProps) {
  console.log("Edit task is re render");

  const priorityList: TaskPriority[] = ["High", "Medium", "Low"];
  const statusList: TaskStatus[] = ["Pending", "Completed"];

  // * State
  const [task, setTask] = useState(taskFromProp);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const key = e.target.name;
    const value = e.target.value;
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSaveTask() {
    onSave(task);
    onClose();
  }

  return (
    <div className="modal-container">
      <div>
        <Button title="x" onClick={onClose} />
      </div>
      <div>
        <p>Task Title</p>
        <Input
          name="title"
          value={task.title}
          type="text"
          placeHolder="Enter Task Title"
          onChange={handleChange}
        />
      </div>

      <div>
        <p>Task Priority</p>
        <Select
          name="priority"
          optionsList={priorityList}
          value={task.priority}
          onChange={handleChange}
        />
      </div>

      <div>
        <p>Task Status</p>
        <Select
          name="status"
          optionsList={statusList}
          value={task.status}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button title="Save" leftIcon={<FaSave />} onClick={handleSaveTask} />
      </div>
    </div>
  );
}
