import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Presentational bell (your existing UI component)
import NotificationBell from "./NotificationComponent";

// Selectors + actions from your Notification slice
import { selectNotifications } from "../../State/Notification/NotificationReducer";
import { markNotificationRead } from "../../State/Notification/NotificationActions";


const STATIC_ITEMS = [
  { id: "add-products",   label: "Add Products from Product Screen",  href: "/product" },
  { id: "add-cart",       label: "Add Items from Cart Page",          href: "/cart" },
  { id: "review-cart",    label: "Review cart from Checkout Page",    href: "/checkout" },
  { id: "make-payment",   label: "Make Payment from Payment Page",    href: "/checkout" }, // no /payment route yet
  { id: "assist-reorder", label: "Assist to Cancel/Reorder",          href: "/resentOrders" },
];

export default function NotificationConnected() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pull dynamic notifications from Redux
  const items = useSelector(selectNotifications);

  // Only pass dynamic items to the UI (cart-count, order-cancelled-*, etc.)
  const dynamicItems = Array.isArray(items)
    ? items
        .filter(n => (n?.type ?? "dynamic") === "dynamic")
        .map(n => ({
          id: n.id,
          label: n.label,
          href: n.href,
          read: !!n.read,
        }))
    : [];

  // When the user opens a notification:
  //  mark it read in Redux
  //  navigate using React Router (no window.location)
  const handleOpenItem = (item) => {
    if (item?.id) dispatch(markNotificationRead(item.id));
    if (item?.href) navigate(item.href);
  };

  return (
    <NotificationBell
      staticItems={STATIC_ITEMS}
      dynamicItems={dynamicItems}
      onOpenItem={handleOpenItem}
    />
  );
}
