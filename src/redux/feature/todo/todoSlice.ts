import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./todoSlice.type";
import { addTodo, deleteTodo, fetchTodos } from "./todoAsync";

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

// function addTodo(state: TodoState, action: PayloadAction<Task>) {
//   state.todos.unshift(action.payload);
// }

function updateTodo(state: TodoState, action: PayloadAction<Task>) {
  const updatedTodo = action.payload;
  const storedTodo = state.todos.find((t) => t.id === updatedTodo.id);

  if (storedTodo) {
    storedTodo.completed = updatedTodo.completed;
    storedTodo.todo = updatedTodo.todo;
  }
}

// function deleteTodo(state: TodoState, action: PayloadAction<number | string>) {
//   state.todos = state.todos.filter((todo) => todo.id !== action.payload);
// }

function deleteAllTodo(state: TodoState) {
  state.todos = [];
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    deleteAllTodoAg: deleteAllTodo,
    updateTodoAg: updateTodo,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        console.log("fetch fullfield");
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
      .addCase(addTodo.fulfilled, (state, action) => {
        state.error = undefined;
        state.loading = false;
        state.todos.unshift(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.error = undefined;
        state.loading = false;
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id,
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { deleteAllTodoAg, updateTodoAg } = todoSlice.actions;

export default todoSlice.reducer;
