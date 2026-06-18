import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./todoSlice.type";
import { fetchTodos } from "./todoAsync";

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

function addTodo(state: TodoState, action: PayloadAction<Task>) {
  state.todos.unshift(action.payload);
}

function updateTodo(state: TodoState, action: PayloadAction<Task>) {
  const updatedTodo = action.payload;
  const storedTodo = state.todos.find((t) => t.id === updatedTodo.id);

  if (storedTodo) {
    storedTodo.completed = updatedTodo.completed;
    storedTodo.todo = updatedTodo.todo;
  }
}

function deleteTodo(state: TodoState, action: PayloadAction<number | string>) {
  state.todos = state.todos.filter((todo) => todo.id !== action.payload);
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodoAg: addTodo,
    updateTodoAg: updateTodo,
    deleteTodoAg: deleteTodo,
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
      });
  },
});

export const { addTodoAg, updateTodoAg, deleteTodoAg } = todoSlice.actions;

export default todoSlice.reducer;
