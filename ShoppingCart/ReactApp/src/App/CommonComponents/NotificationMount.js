import useSyncCartNotifications from "../Hooks/syncCartNoftifications";


export default function NotificationMount() {
  useSyncCartNotifications();
  return null;
}