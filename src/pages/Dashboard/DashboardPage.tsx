import { FaPlus } from "react-icons/fa";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import Navbar from "../../Components/Navbar/Navbar";
import "./dshboard.style.css";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import type { Task, TaskStatus } from "../../types/task.type";
import Select from "../../Components/Select/Select";
import { fillDefaultTaskProperty, saveTask } from "../../utils/dashboard.utils";
import Card from "../../Components/Card/Card";

const defaultdata: Task[] = [
  {
    id: "1",
    title: "Complete Todo App",
    status: "Completed",
    priority: "Low",
    date: new Date(),
  },
  {
    id: "3",
    title: "Complete Portfolio website",
    status: "Pending",
    priority: "Medium",
    date: new Date(),
  },
  {
    id: "4",
    title: "Complete Color pallate",
    status: "Completed",
    priority: "High",
    date: new Date(),
  },
  {
    id: "5",
    title: "Complete some other website",
    status: "Pending",
    priority: "High",
    date: new Date(),
  },
];

export default function DashboardPage() {
  const [allTaskList, setAllTaskList] = useState(defaultdata);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "All">(
    "All",
  );
  const [task, setTask] = useState<Partial<Task>>({ title: "" });

  const filterTaskList = useMemo(() => {
    switch (selectedStatus) {
      case "Completed":
      case "Pending":
        return allTaskList.filter((task) => task.status === selectedStatus);

      default:
        return allTaskList;
    }
  }, [allTaskList, selectedStatus]);

  useEffect(() => {
    saveTask(allTaskList);
  }, [allTaskList]);

  const memoInputContainerStyle = useMemo(() => {
    return { flex: 1 };
  }, []);

  const taskStatus = useMemo(() => {
    return ["Select Priority", "High", "Medium", "Low"];
  }, []);

  function handleNavLinkChange(status: TaskStatus | "All") {
    setSelectedStatus(status);
  }

  // edit the task
  function editTask(currentTask: Task) {
    console.log(currentTask);
    setTask(currentTask);
  }

  // delete the task
  function deleteTask(id: string) {
    //update the all task that lead to update the filtertask
    setAllTaskList(allTaskList.filter((task) => task.id !== id));
    // const removedTaskList = taskList.filter((_, ind) => ind !== index);
    // setTaskList(removedTaskList);
  }

  function onCheckboxChecked(currentTask: Task, id: string) {
    if (currentTask.status === "Completed") currentTask.status = "Pending";
    else currentTask.status = "Completed";

    const updateTaskIndex = allTaskList.findIndex((task) => task.id === id);

    const prefixArray = allTaskList.slice(0, updateTaskIndex);
    const sufixArray = allTaskList.slice(updateTaskIndex + 1);

    setAllTaskList([...prefixArray, currentTask, ...sufixArray]);
  }

  function handleAddBtnClick() {
    console.log("btn clicked");
    const isValid = validate(task);
    console.log(isValid);
    if (!isValid) {
      alert("Enter title or select the priority");
      return;
    }
    const newTask: Task = { ...task, ...fillDefaultTaskProperty() };
    const newTaskList = [...allTaskList, newTask];
    setAllTaskList(newTaskList);
  }

  function validate(task: Partial<Task>): task is Task {
    const requiredKeys = ["title", "priority"];

    for (const key of requiredKeys) {
      const typedKey = key as keyof Task;
      if (
        !(typedKey in task) ||
        task[typedKey] == undefined ||
        task[typedKey] == "Select Priority"
      ) {
        return false;
      }
    }
    return true;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name: key, value } = e.target;
    console.log(name, value);
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(task);
  }

  return (
    <div className="dashboard-container">
      <section className="dashboard__nav-container">
        <Navbar onNavLinkClick={handleNavLinkChange} status={selectedStatus} />
      </section>

      <section className="dashboard__task-list-container">
        {/* header */}
        <article>
          <h3>All Task</h3>
        </article>

        <article className="dashboard__task-actions">
          <Input
            value={task.title}
            type="text"
            name="title"
            placeHolder="Add new task..."
            onChange={handleChange}
            containerStyle={memoInputContainerStyle}
          />

          <Select
            value={task.priority ?? "Select Priority"}
            name="priority"
            optionsList={taskStatus}
            onChange={handleChange}
          />

          <Button
            title="Add"
            leftIcon={<FaPlus />}
            onClick={handleAddBtnClick}
          />
        </article>

        <article>
          {/* TaskList Container */}
          {filterTaskList.map((taskData) => (
            <Card
              id={taskData.id}
              key={taskData.id}
              title={taskData.title}
              status={taskData.status}
              onChecked={() => {
                onCheckboxChecked(taskData, taskData.id);
              }}
              onEdit={() => {
                editTask(taskData);
              }}
              onDelete={() => {
                deleteTask(taskData.id);
              }}
            />
          ))}
        </article>
      </section>
    </div>
  );
}
