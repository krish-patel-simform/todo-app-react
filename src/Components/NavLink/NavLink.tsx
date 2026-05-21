import "./navlink.style.css";
import type { NavLinkProps } from "./navlink.type";

export default function NavLink({
  title,
  leftIcon: LeftIcon,
  count,
  isActive,
  onClick,
}: NavLinkProps) {
  return (
    <button
      className={`nav-link ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {/* Left icon */}
      {LeftIcon}
      {title}
      <div className="nav-link__count">{count}</div>
    </button>
  );
}
