import { FaPlus } from "react-icons/fa";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import Navbar from "../../Components/Navbar/Navbar";
import "./dshboard.style.css";
import { useMemo, useState, type ChangeEvent } from "react";
import type { Task } from "../../types/task.type";
import Select from "../../Components/Select/Select";
import { insertTask } from "../../utils/dashboard.utils";

export default function DashboardPage() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState<Partial<Task>>({});

  const taskStatus = useMemo(() => {
    return ["Select Priority", "High", "Medium", "Low"];
  }, []);

  // create new Task

  // save task

  // edit the task

  // delete the task

  function handleAddBtnClick() {
    console.log("btn clicked");
    const isValid = validate(task);

    if (!isValid) {
      alert("Enter title or select the priority");
      return;
    }
    const newTaskList = insertTask(taskList, task);
    setTaskList(newTaskList);
  }

  function validate(task: Partial<Task>): task is Task {
    for (const key in task) {
      const typedKey = key as keyof Task;

      if (task[typedKey] == undefined || task[typedKey] === "Select Priority") {
        return false;
      }
    }
    return true;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name: key, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="dashboard-container">
      <section className="dashboard__nav-container">
        <Navbar />
      </section>

      <section className="dashboard__task-list-container">
        {/* List Container */}

        {/* header */}
        <article>
          <h3>All Task</h3>
        </article>

        <article className="dashboard__task-actions">
          <Input
            type="text"
            placeHolder="Add new task..."
            onChange={handleChange}
          />

          <Select name="priority" optionsList={taskStatus} />

          <Button
            title="Add"
            leftIcon={<FaPlus />}
            onClick={handleAddBtnClick}
          />
        </article>

        <article>
          {/* TaskList Container */}
          {taskList.map((task, index) => (
            <p key={`${task.title} + ${index}`}>{task.title}</p>
          ))}
        </article>
      </section>
    </div>
  );
}
