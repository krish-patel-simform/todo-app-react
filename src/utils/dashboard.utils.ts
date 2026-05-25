import { nanoid } from "nanoid";
import type { Task, TaskStatus } from "../types/task.type";

export function getStoredTask()
{
  return JSON.parse(localStorage.getItem('tasks') || "[]")
}


export function fillDefaultTaskProperty() {
  return {
    status : 'Pending' as TaskStatus,
    date : new Date(),
    id : nanoid(6)
  }
}

export function saveTask(tasks: Task[]) {
  //Set in localstorage
  const stringFormOfTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringFormOfTasks);
}

export function deleteAllTask() {
  localStorage.removeItem("tasks");
}
