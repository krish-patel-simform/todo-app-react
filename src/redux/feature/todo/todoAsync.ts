import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "./todoSlice.type";
const instance = axios.create({
  baseURL: "https://dummyjson.com/todos",
});

export const fetchTodos = createAsyncThunk("fetch/todos", async () => {
  const response = await instance.get("");

  return response.data.todos;
});

export const fetchTodoById = createAsyncThunk(
  "fetch/todoById",
  async (id: number) => {
    const response = await instance.get(`/${id}`);
    return response.data;
  },
);

export const addTodo = createAsyncThunk("addTodo", async (newTask: Task) => {
  const respone = await instance.post("/add", { ...newTask });

  console.log("Response:", respone);
  const data = respone.data;
  console.log("Add Task in todo:", data);

  return data;
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (id: number) => {
  const response = await instance.delete(`/${id}`);

  const data = response.data;
  return data;
});

// export const updateTodo = createAsyncThunk(
//   "updateTodo",
//   async (editedTask: Task) => {
//     if (editedTask.id) {
//       console.log("Before calling API", editedTask);
//       const response = await fetch(
//         `https://dummyjson.com/todos/${editedTask.id}`,
//         {
//           method: "PUT",
//           body: JSON.stringify(editedTask),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );
//       const data = await response.json();
//       console.log("update API:", data);
//       return data;
//     }
//   },
// );
