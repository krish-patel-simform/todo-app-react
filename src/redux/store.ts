import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import todoReducer from "./feature/todo/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

type RootStore = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootStore>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
