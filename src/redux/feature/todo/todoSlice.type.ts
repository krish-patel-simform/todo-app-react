export type TaskStatus = "Completed" | "Pending";

export type TaskPriority = "High" | "Medium" | "Low";

export type TaskCategory =
  | "Work"
  | "Personal"
  | "Study"
  | "Health"
  | "Shopping"
  | "Others";

export type Task = {
  id: number | string;
  todo: string;
  completed: boolean;
  userId: number;
  //   status: TaskStatus;
  //   priority: TaskPriority;
  //   date: Date;
  //   category: TaskCategory;
  //   deadline: Date;
  //   isNotificationSentOnDueDate: boolean;
};
