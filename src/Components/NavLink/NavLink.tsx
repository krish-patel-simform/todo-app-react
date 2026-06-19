import "./navlink.style.css";
import type { NavLinkProps } from "./navlink.type";

export default function NavLink({
  title,
  leftIcon: LeftIcon,
  count,
  isActive,
  onClick,
  dataStatus,
}: NavLinkProps) {
  return (
    <button
      className={`nav-link ${isActive ? "active" : ""}`}
      onClick={onClick}
      data-status={dataStatus}
    >
      {/* Left icon */}
      {LeftIcon}
      {title}
      {count ?? <div className="nav-link__count">{count}</div>}
    </button>
  );
}
