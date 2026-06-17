import "./navlink.style.css";
import type { NavLinkProps } from "./navlink.type";
import { Button } from "@/components/ui/button";
export default function NavLink({
  title,
  leftIcon: LeftIcon,
  count,
  isActive,
  onClick,
  dataStatus,
}: NavLinkProps) {
  return (
    <Button
      className={`font-normal nav-link ${isActive ? "active" : ""}`}
      onClick={onClick}
      data-status={dataStatus}
    >
      {/* Left icon */}
      {LeftIcon}
      {title}
      {count !== undefined ? (
        <div className="nav-link__count">{count}</div>
      ) : null}
    </Button>
  );
}
