import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "./todoSlice.type";

const instance = axios.create({
  baseURL: "https://dummyjson.com/todos",
});

export const fetchTodos = createAsyncThunk("fetch/todos", async () => {
  const response = await instance.get("");

  return response.data;
});

export const fetchTodoById = createAsyncThunk(
  "fetch/todoById",
  async (id: number) => {
    const response = await instance.get(`/${id}`);

    return response.data;
  },
);

export const addTodo = createAsyncThunk("addTodo", async (todo: Task) => {
  const response = await instance.post("/add", { todo });

  return await response.data;
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (id: number) => {
  const response = await instance.delete(`${id}`);

  return await response.data;
});
