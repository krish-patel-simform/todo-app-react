import "./card.style.css";
import "./card.type";
import Input from "../Input/Input";
import type { Task } from "../../types/task.type";
import { MdDelete, MdEdit } from "react-icons/md";
import { memo, useMemo } from "react";

function Card({
  title,
  status,
  onChecked,
  onEdit,
  onDelete,
}: Task &  {
  onChecked: (...args: unknown[]) => void;
  onEdit: (...args: unknown[]) => void;
  onDelete: (...args: unknown[]) => void;
}) {
  const memoInputContainerStyle = useMemo(() => {
    return { border: "none" };
  }, []);

  const memoInputStyle = useMemo(() => {
    return { accentColor: `var(--primary-color)` };
  }, []);

  console.log("Card is re render")

  return (
    <div className="card-container">
      <section className="card__section">
        {/* Checkbox */}
        <Input
          type="checkbox"
          containerStyle={memoInputContainerStyle}
          style={memoInputStyle}
          checked={status === "Completed" ? true : false}
          onChange={onChecked}
        />
        <p className="">{title}</p>
      </section>

      <section className="card__section">
        <p
          className={`${status == "Completed" ? "card__actions__status-green" : "card__actions__status-orange"} `}
        >
          {status}
        </p>
        <MdEdit color="blue" onClick={onEdit} cursor={'pointer'}/>
        <MdDelete color="red" onClick={onDelete} cursor={'pointer'}/>
      </section>
    </div>
  );
}


export default memo(Card)