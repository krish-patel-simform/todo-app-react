import type { ModalProps } from "./modal.type";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import type { Task } from "../../redux/feature/todo/todoSlice.type";
import "./modal.style.css";
import { fillDefaultTaskProperty } from "../../utils/dashboard.utils";
import { InputField } from "@/components/InputField/InputField";
import { DropDown } from "@/components/DropDown/DropDown";
import type { Option } from "@/components/DropDown/dropdown.type";
import { useAppDispatch } from "@/redux/store";
import { addTodoAg, updateTodoAg } from "@/redux/feature/todo/todoSlice";

const statusList: Option[] = [
  { value: "Completed", label: "Completed" },
  { value: "Pending", label: "Pending" },
];

export default function Modal({
  header,
  defaultTask,
  onClose,
  mode,
}: ModalProps) {
  //   * State

  const dispatch = useAppDispatch();

  function handleSubmit(formData: FormData) {
    const title = formData.get("title");

    console.log(title);

    if (!title) {
      alert("Please fill title");
      return;
    }
    const commonTask = {
      todo: title.toString(),
      userId: 123,
    };
    let newTask: Task | null = null;
    if (mode === "Edit" && defaultTask) {
      const completed = formData.get("status") === "Completed" ? true : false;

      newTask = {
        ...commonTask,
        completed,
        id: defaultTask.id,
      };
    } else if (mode === "New") {
      newTask = { ...commonTask, ...fillDefaultTaskProperty() };
    }
    // onSave(newTask as Task);
    if (newTask !== null) {
      dispatch(mode === "Edit" ? updateTodoAg(newTask) : addTodoAg(newTask));
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
              defaultValue={defaultTask?.todo ?? ""}
              type="text"
              name="title"
              placeHolder="Enter task title"
              required
            />
          </article>

          <article className="modal__selects">
            {mode === "Edit" ? (
              <div>
                <DropDown
                  name="status"
                  label="Status"
                  defaultValue={
                    defaultTask?.completed ? "Completed" : "Pending"
                  }
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
