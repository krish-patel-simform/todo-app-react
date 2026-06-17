import type { ModalProps } from "./modal.type";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import type {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "../../types/task.type";
import "./modal.style.css";
import { fillDefaultTaskProperty } from "../../utils/dashboard.utils";
import { InputField } from "@/components/InputField/InputField";
import { DropDown } from "@/components/DropDown/DropDown";
import type { Option } from "@/components/DropDown/dropdown.type";

const priorityList: Option[] = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const categoryList: Option[] = [
  { label: "Work", value: "Work" },
  { label: "Study", value: "Study" },
  { label: "Shopping", value: "Shopping" },
  { label: "Personal", value: "Personal" },
  { label: "Health", value: "Health" },
  { label: "Others", value: "Others" },
];

const statusList: Option[] = [
  { value: "Completed", label: "Completed" },
  { value: "Pending", label: "Pending" },
];

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
            <InputField
              label="Task Title"
              defaultValue={defaultTask?.title ?? ""}
              type="text"
              name="title"
              placeHolder="Enter task title"
              required
            />
          </article>

          <article className="modal__selects">
            <div>
              <DropDown
                label="Priority"
                className="w-full"
                defaultValue={defaultTask?.priority ?? "High"}
                name="priority"
                options={priorityList}
              />
            </div>
            <div>
              <InputField
                label="Dead Line"
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
              />
            </div>
            <div>
              <DropDown
                name="category"
                label="Category"
                className="w-full"
                defaultValue={defaultTask?.category ?? "Work"}
                options={categoryList}
              />
            </div>
            {mode === "Edit" ? (
              <div>
                <DropDown
                  name="status"
                  label="Status"
                  defaultValue={defaultTask?.status ?? "Pending"}
                  className="w-full"
                  options={statusList}
                />
              </div>
            ) : null}
          </article>
          <article className="modal__actions">
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
