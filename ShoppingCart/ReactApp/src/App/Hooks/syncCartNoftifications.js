import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncCartCountNotification } from "../State/Notification/NotificationActions";


export default function useSyncCartNotifications() {
  const dispatch = useDispatch();

  // Adjust this selector if your cart shape differs
  const count = useSelector((s) =>
    Array.isArray(s?.cartState?.items) ? s.cartState.items.length : 0
  );

  useEffect(() => {
    dispatch(syncCartCountNotification(count));
  }, [dispatch, count]);
}
