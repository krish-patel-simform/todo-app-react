import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "./todoSlice.type";
import { addTodo, fetchTodos } from "./todoAsync";

type TodoState = {
  todos: Task[];
  loading: boolean;
  error: string | undefined;
};

const initialState: TodoState = {
  todos: [],
  loading: true,
  error: undefined,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.todos.push(action.payload);
      });
  },
});

export default todoSlice.reducer;
