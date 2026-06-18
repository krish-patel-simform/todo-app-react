// import type { Task } from "../types/task.type";

// export type AllTaskListState = Task[];

// export type AllTaskListAction =
//   | { type: "insert"; payload: Task }
//   | { type: "delete"; payload: string }
//   | { type: "edit"; payload: Task }
//   | { type: "deleteAll" };

// export function allTaskListReducer(
//   prevState: AllTaskListState,
//   action: AllTaskListAction,
// ): AllTaskListState {
//   switch (action.type) {
//     case "insert": {
//       console.log("btn clicked");
//       const newTask = action.payload as Task;
//       console.log(prevState);
//       const newTaskList = [newTask, ...prevState];
//       return newTaskList;
//     }
//     case "edit": {
//       const editedTask = action.payload as Task;
//       const updatedTaskIndex = prevState.findIndex(
//         (task) => task.id === editedTask.id,
//       );

//       const prefixArray = prevState.slice(0, updatedTaskIndex);
//       const suffixArray = prevState.slice(updatedTaskIndex + 1);

//       return [...prefixArray, editedTask, ...suffixArray];
//     }
//     case "delete": {
//       const id = action.payload;
//       return prevState.filter((task) => task.id !== id);
//     }
//     case "deleteAll": {
//       return [];
//     }
//   }
// }
