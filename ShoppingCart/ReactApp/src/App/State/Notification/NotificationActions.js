
//  Action Types 
export const NOTIF_ADD = "notifications/ADD";
export const NOTIF_UPSERT = "notifications/UPSERT";
export const NOTIF_MARK_READ = "notifications/MARK_READ";
export const NOTIF_MARK_ALL_READ = "notifications/MARK_ALL_READ";
export const NOTIF_CLEAR = "notifications/CLEAR";

// === Plain Action Creators ===
export const addNotification = (notif) => ({
  type: NOTIF_ADD,
  payload: normalize(notif),
});

export const upsertNotification = (notif) => ({
  type: NOTIF_UPSERT,
  payload: normalize(notif),
});

export const markNotificationRead = (id) => ({
  type: NOTIF_MARK_READ,
  payload: id,
});

export const markAllNotificationsRead = () => ({ type: NOTIF_MARK_ALL_READ });

export const clearNotification = (id) => ({
  type: NOTIF_CLEAR,
  payload: id, // optional
});

// === Thunk Action Creators  ===
export const syncCartCountNotification =
  (count) => (dispatch, getState) => {
    const id = "cart-count";
    if (!Number.isFinite(count) || count < 0) count = 0;

    if (count === 0) {
      const exists = getState()?.notifications?.items?.some((n) => n.id === id);
      if (exists) dispatch(clearNotification(id));
      return;
    }

    const label =
      count === 1
        ? "You have 1 item in your cart"
        : `You have ${count} items in your cart`;

    dispatch(
      upsertNotification({
        id,
        type: "dynamic",
        label,
        href: "/cart",
        read: false,
      })
    );
  };


// Order Canceled Notification
export const notifyOrderCancelled = (orderLike) => (dispatch) => {
  const ts = Date.now();
  const orderId = extractOrderId(orderLike);

  const idSuffix = orderId != null ? String(orderId) : String(ts);
  const notifId = `order-cancelled-${idSuffix}-${ts}`;

  dispatch(
    addNotification({
      id: notifId,
      type: "dynamic",
      label: orderId != null
        ? `Order #${orderId} was cancelled`
        : `An order was cancelled`,
      href: "/resentOrders", // matches your route
      read: false,
      createdAt: ts,
      meta: { orderId },     // keep for later if needed
    })
  );
};

// === Internal Utils ===
function normalize(n) {
  const now = Date.now();
  return {
    id: n.id ?? `notif-${now}-${Math.random().toString(36).slice(2)}`,
    type: n.type ?? "dynamic",
    label: n.label ?? "Notification",
    read: !!n.read,
    href: n.href ?? undefined,
    createdAt: n.createdAt ?? now,
  };
}

function extractOrderId(x) {
  if (x == null) return null;
  if (typeof x === "string" || typeof x === "number") return x;

  // common shapes from APIs / UI lists
  return (
    x.orderId ??
    x.id ??
    x._id ??
    x.order_id ??
    x.number ??   // sometimes orders use human-facing numbers
    x.code ??     // fallback keys people use
    null
  );
}

