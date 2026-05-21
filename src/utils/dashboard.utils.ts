import type { Task, TaskStatus } from "../types/task.type";

export function createTask(
  title: string,
  status: TaskStatus,
  date: Date = new Date(),
): Task {
  return { title, status, date };
}

export function insertTask(state: Task[], task: Task) {
  return [...state, task];
}

export function saveTask(tasks: Task[]) {
  //Set in localstorage
  const stringFormOfTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringFormOfTasks);
}

export function deleteAllTask() {
  localStorage.removeItem("tasks");
}
