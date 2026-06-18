import type { Task } from "@/redux/feature/todo/todoSlice.type";
import { nanoid } from "nanoid";

// export const defaultdata: Task[] = [
//   {
//     id: "1",
//     title: "Complete Todo App",
//     status: "Completed",
//     priority: "Low",
//     date: new Date(),
//     category: "Work",
//     deadline: new Date(),
//     isNotificationSentOnDueDate: false,
//   },
//   {
//     id: "3",
//     title: "Complete Portfolio website",
//     status: "Pending",
//     priority: "Medium",
//     date: new Date(),
//     category: "Work",
//     deadline: new Date(),
//     isNotificationSentOnDueDate: false,
//   },
//   {
//     id: "4",
//     title: "Complete Color pallate",
//     status: "Completed",
//     priority: "High",
//     date: new Date(),
//     category: "Work",
//     deadline: new Date(),
//     isNotificationSentOnDueDate: false,
//   },
//   {
//     id: "5",
//     title: "Complete some other website",
//     status: "Pending",
//     priority: "High",
//     date: new Date(),
//     category: "Work",
//     deadline: new Date(),
//     isNotificationSentOnDueDate: false,
//   },
// ];

export function getStoredTask() {
  const jsonData = JSON.parse(
    localStorage.getItem("tasks") || "[]",
    (key: string, value: string) => {
      if (key === "date" || key === "deadline") {
        return new Date(value);
      }
      return value;
    },
  );
  console.log("JSON Date:", jsonData);
  return jsonData;
}

export function fillDefaultTaskProperty() {
  return {
    completed: false,
    id: nanoid(6),
  };
}

export function saveTask(tasks: Task[]) {
  //Set in localstorage
  const stringFormOfTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringFormOfTasks);
}

export function deleteAllTask() {
  localStorage.removeItem("tasks");
}

export function validate(task: Partial<Task>): task is Task {
  const requiredKeys = ["title", "priority"];

  for (const key of requiredKeys) {
    const typedKey = key as keyof Task;
    if (
      !(typedKey in task) ||
      task[typedKey] == undefined ||
      task[typedKey] == "Select Priority"
    ) {
      return false;
    }
  }
  return true;
}

export function sendNotification(message: string, id: string) {
  const notification = new window.Notification("Task Deadline", {
    body: message,
    silent: false,
    tag: id,
  });

  setTimeout(() => {
    notification.close();
  }, 2000);

  // notification.
}

export async function checkNotificationPermission(): Promise<boolean> {
  console.log("Notification" in window);
  console.log(window.Notification.permission);
  if (!("Notification" in window)) {
    alert("Broswer Does not support notification");
    return false;
  } else if (window.Notification.permission === "granted") {
    return true;
  } else {
    console.log("Here request fir notification");
    return await window.Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (permission === "granted") {
        return true;
      } else {
        return false;
      }
    });
  }
}

// export function isTodayIsDue(task: Task) {
//   const today = new Date();
//   const deadlineDate = task.deadline;
//   return (
//     today.getDate() === deadlineDate.getDate() &&
//     today.getMonth() === deadlineDate.getMonth() &&
//     today.getFullYear() === deadlineDate.getFullYear()
//   );
// }

export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// export async function checkAllTaskForNotification(allTask: Task[]) {
//   for (const task of allTask) {
//     console.log(task);
//     console.log(isTodayIsDue(task));
//     if (isTodayIsDue(task) && !task.isNotificationSentOnDueDate) {
//       console.log("Notification send");
//       sendNotification(`Today is deadline for ${task.title}`, task.id);
//       updateTaskSentNotification(task);
//       // if (!notificationSent) break;
//       await delay(3000);
//     }
//   }
//   saveTask(allTask);
// }

// function updateTaskSentNotification(task: Task) {
//   console.log("Update task's isNotificationOnDueDate is called");
//   task.isNotificationSentOnDueDate = true;
// }
