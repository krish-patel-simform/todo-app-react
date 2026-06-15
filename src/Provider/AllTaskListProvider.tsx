import { useReducer, type PropsWithChildren } from "react";
import AllTaskListContext from "../context/AllTasksContext";
import { allTaskListReducer } from "../reducer/alltaskListReducer";
import { getStoredTask } from "../utils/dashboard.utils";

export default function AllTaskListProvider({ children }: PropsWithChildren) {
  const [allTaskList, dispatchAllTaskList] = useReducer(
    allTaskListReducer,
    undefined,
    getStoredTask,
  );

  const value = {
    allTaskList,
    dispatchAllTaskList,
  };

  return <AllTaskListContext value={value}>{children}</AllTaskListContext>;
}
