import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
