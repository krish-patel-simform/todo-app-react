import "./notification.style.css";
import "./notification.type";
import NotificationCard from "../Card/NotificationCard";
import { useState } from "react";
import RequestNotification from "../Card/RequestNotification";
import { Button } from "@/components/ui/Button/button";
import {
  checkAllTaskForNotification,
  checkNotificationPermission,
  isTodayIsDue,
  sendNotification,
} from "../../utils/dashboard.utils";
import type { NotificationProps } from "./notification.type";

export default function Notification({ allTask }: NotificationProps) {
  const [isUserResponed, setUserResponed] = useState(false);

  console.log("is UserResponse:", isUserResponed);

  async function enableNotifyAndClose() {
    console.log("Btn clicked");
    // await checkNotificationPermission("test", "123456");
    const granted = await checkNotificationPermission();

    setUserResponed(true);
    if (!granted) {
      return;
    }

    checkAllTaskForNotification(allTask);
  }

  function disableNotifiyAndClose() {
    setUserResponed(true);
  }

  function handleSendNotification() {
    const granted = checkNotificationPermission();
    if (!granted) return;

    sendNotification("Test Notification", "123456");
  }

  console.log(allTask);

  console.log("Notification permission:", window.Notification.permission);

  return (
    <div className="notification-container">
      {!isUserResponed && !(window.Notification.permission === "granted") ? (
        // Request Notification
        <RequestNotification
          onSuccess={enableNotifyAndClose}
          onFail={disableNotifiyAndClose}
        />
      ) : window.Notification.permission === "granted" ? (
        <>
          <section className="notification-header">
            <h3>Notification for today's deadline</h3>
            <Button variant="primary" onClick={handleSendNotification}>
              <p>Send Notification</p>
            </Button>
          </section>

          <section className="notification-due-task-list">
            {allTask
              .filter((task) => isTodayIsDue(task))
              .map((dueTask) => {
                return (
                  <NotificationCard
                    title={dueTask.title}
                    category={dueTask.category}
                    priority={dueTask.priority}
                  />
                );
              })}
          </section>
        </>
      ) : (
        <h3>You have disable Notification</h3>
      )}
    </div>
  );
}
