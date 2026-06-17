import type { ModalProps } from "./modal.type";
import { Button } from "@/components/ui/Button/button";
import Input from "../Input/Input";
import { FaPlus, FaCalendar } from "react-icons/fa";
import Select from "../Select/Select";
import type {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "../../types/task.type";
import "./modal.style.css";
import { fillDefaultTaskProperty } from "../../utils/dashboard.utils";

const priorityList: TaskPriority[] = ["High", "Medium", "Low"];

const selectStyle = { width: "100%" };

const categoryList: TaskCategory[] = [
  "Work",
  "Study",
  "Shopping",
  "Personal",
  "Health",
  "Others",
];

const statusList: TaskStatus[] = ["Completed", "Pending"];

export default function Modal({
  header,
  defaultTask,
  onClose,
  mode,
  dispatchAction,
}: ModalProps) {
  const today = new Date().toISOString().split("T")[0];

  //   * State

  function handleSubmit(formData: FormData) {
    const title = formData.get("title");
    const priority = formData.get("priority") as TaskPriority;
    const category = formData.get("category") as TaskCategory;
    const deadLineDate = formData.get("deadline");

    console.log(title, priority, category, deadLineDate);

    if (!title) {
      alert("Please fill title");
      return;
    } else if (!priority) {
      alert("Please fill priority");
      return;
    } else if (!category) {
      alert("Please fill category");
      return;
    } else if (!deadLineDate) {
      alert("Please fill deadline");
      return;
    }
    const deadline = new Date(deadLineDate.toString());
    const commonTask = {
      title: title.toString(),
      priority: priority,
      category: category,
      deadline: deadline,
    };
    let newTask: Task | null = null;
    if (mode === "Edit" && defaultTask) {
      const status = formData.get("status") as TaskStatus;
      newTask = {
        ...commonTask,
        date: defaultTask.date,
        status: status,
        id: defaultTask.id,
        isNotificationSentOnDueDate:
          defaultTask.deadline === deadline
            ? defaultTask.isNotificationSentOnDueDate
            : false,
      };
    } else if (mode === "New") {
      newTask = { ...commonTask, ...fillDefaultTaskProperty() };
    }
    // onSave(newTask as Task);
    if (newTask !== null) {
      dispatchAction({
        type: mode === "Edit" ? "edit" : "insert",
        payload: newTask,
      });
    }
    onClose();
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <section className="modal__header">
          {/*header */}
          <h4>{header}</h4>

          <Button variant="secondary" onClick={onClose}>
            <p>X</p>
          </Button>
        </section>
        <hr />
        <form action={handleSubmit} className="modal__form-container">
          <article>
            <p>Task Title</p>
            <Input
              defaultValue={defaultTask?.title ?? ""}
              type="text"
              name="title"
              placeHolder="Enter task title"
              required
            />
          </article>

          <article className="modal__selects">
            <div>
              <p>Priority</p>
              <Select
                defaultValue={defaultTask?.priority ?? "High"}
                name="priority"
                optionsList={priorityList}
                style={selectStyle}
              />
            </div>
            <div>
              <p>Dead Line</p>
              {/* date selecotr */}
              <Input
                type="date"
                name="deadline"
                defaultValue={
                  defaultTask?.deadline?.toISOString().split("T")[0] ?? ""
                }
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                min={today}
                placeHolder="Select date"
                leftIcon={<FaCalendar />}
              />
            </div>
            <div>
              <p>Category</p>
              <Select
                name="category"
                defaultValue={defaultTask?.category ?? "Work"}
                optionsList={categoryList}
                style={selectStyle}
              />
            </div>
            {mode === "Edit" ? (
              <div>
                <p>Status</p>
                <Select
                  name="status"
                  defaultValue={defaultTask?.status ?? "Pending"}
                  optionsList={statusList}
                  style={selectStyle}
                />
              </div>
            ) : null}
          </article>
          <article className="modal__actions">
            {/* <Button
              isPrimary={false}
              type="button"
              title="Cancel"
              onClick={onClose}
            />
            <Button
              isPrimary={true}
              type="submit"
              title={header}
              leftIcon={<FaPlus />}
            /> */}

            <Button onClick={onClose} variant="secondary">
              <p>Cancel</p>
            </Button>

            <Button variant="primary" type="submit">
              <FaPlus />
              <p>{header}</p>
            </Button>
          </article>
        </form>
      </div>
    </div>
  );
}
