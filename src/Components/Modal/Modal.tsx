import type { ModalProps } from "./modal.type";
import Button from "../Button/Button";
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

export default function Modal({
  header,
  defaultTask,
  onClose,
  onSave,
  mode,
}: ModalProps) {
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
  const today = new Date().toISOString().split("T")[0];

  //   * State

  function handleSubmit(formData: FormData) {
    const title = formData.get("title");
    const priority = formData.get("priority") as TaskPriority;
    const category = formData.get("category") as TaskCategory;
    const deadLineDate = formData.get("deadline");

    console.log(title, priority, category, deadLineDate);

    if (!title || !priority || !category || !deadLineDate) {
      alert("Please Fill all thing");
      return;
    }

    let newTask: Task = {
      title: title.toString(),
      priority: priority,
      category: category,
      deadline: new Date(deadLineDate.toString()),
      ...fillDefaultTaskProperty(),
    };

    if (mode === "Edit") {
      const status = formData.get("status") as TaskStatus;

      newTask = {
        ...newTask,
        date: defaultTask ? defaultTask.date : new Date(),
        status: status,
        id: defaultTask ? defaultTask.id : "123456",
      };

      // const editedTask: Task = {
      //   title: title.toString(),
      //   id: defaultTask ? defaultTask.id : "123456",
      //   deadline: new Date(deadLineDate.toString()),
      //   priority: priority,
      //   category: category,
      //   status: status,
      //   date: defaultTask ? defaultTask.date : new Date(),
    }
    onSave(newTask);
    onClose();
  }

  function handleCloseBtnClick() {
    onClose();
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <section className="modal__header">
          {/*header */}
          <h4>{header}</h4>
          <Button isPrimary={false} title="X" onClick={onClose} />
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
                  defaultTask?.date?.toISOString().split("T")[0] ?? ""
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
            <Button
              isPrimary={false}
              type="button"
              title="Cancel"
              onClick={handleCloseBtnClick}
            />
            <Button
              isPrimary={true}
              type="submit"
              title={header}
              leftIcon={<FaPlus />}
            />
          </article>
        </form>
      </div>
    </div>
  );
}
