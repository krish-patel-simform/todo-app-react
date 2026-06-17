import "./notificationCard.type";
import "./notificationCard.style.css";
import type { NotificationCardProps } from "./notificationCard.type";
import { MdCircleNotifications } from "react-icons/md";

export default function NotificationCard({ title }: NotificationCardProps) {
  return (
    <div className="notification-card-container">
      <section className="notification-card__icon">
        <MdCircleNotifications />
      </section>
      <section className="notification-content">
        {/* Content */}
        <p className="notification-content__header">DeadLine Today</p>
        <p>{title}</p>
      </section>
    </div>
  );
}
