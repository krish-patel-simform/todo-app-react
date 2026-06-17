import { Button } from "@/components/ui/Button/button";
import "./requestNotification.style.css";
import { TiTick } from "react-icons/ti";
import "./requestNotification.type";
import type { RequestNotificationProps } from "./requestNotification.type";

export default function RequestNotification({
  onSuccess,
  onFail,
}: RequestNotificationProps) {
  return (
    <div className="request-notification-container">
      <section className="request-notification__icon">
        <TiTick />
      </section>

      <section className="request-notification__content">
        <p className="request-notification__content-header">Notifications</p>
        <p>Would you like to enable the notification</p>
      </section>

      <section className="request-notification__actions">
        {/* <Button title="Sure" isPrimary={true} onClick={onSuccess} />
        <Button title="No thanks!" isPrimary={false} onClick={onFail} /> */}

        <Button variant="primary" onClick={onSuccess}>
          <p>Sure</p>
        </Button>

        <Button variant={"secondary"} onClick={onFail}>
          <p>No thanks!</p>
        </Button>
      </section>
    </div>
  );
}
