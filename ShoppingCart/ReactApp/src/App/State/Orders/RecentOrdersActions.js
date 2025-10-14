import * as actionTypes from "../actionTypes";
import { notifyOrderCancelled} from "../Notification/NotificationActions"
// helpers
const json = (r) => r.json();
const api = (path, init) => fetch(`http://localhost:9000${path}`, init);

export const setLoading = (b) => ({ type: actionTypes.ORDERS_LOADING, payload: b });
export const setError   = (msg) => ({ type: actionTypes.ORDERS_ERROR,   payload: msg });
export const setOrders  = (list) => ({ type: actionTypes.ORDERS_SET,    payload: list });
export const orderUpdated = (order) => ({ type: actionTypes.ORDER_UPDATED, payload: order });

// POST /orders — called on Make Payment 
export const placeOrder = ({ userId, items, coupon }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api(`/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items, coupon }),
    });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || `HTTP ${res.status}`);
    const created = await json(res);
    // refresh my orders list
    await dispatch(fetchMyOrders(userId));
    return created;
  } catch (e) {
    dispatch(setError(e.message || "Failed to place order"));
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};

// GET /orders/user/:userId 
export const fetchMyOrders = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api(`/orders/user/${userId}`);
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || `HTTP ${res.status}`);
    const list = await json(res);
    dispatch(setOrders(list));
    return list;
  } catch (e) {
    dispatch(setError(e.message || "Failed to fetch orders"));
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};

// POST /orders/:id/cancel 
export const cancelOrder = ({ orderId, userId }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api(`/orders/${orderId}/cancel`, { method: "POST" });
    const body = await json(res).catch(() => ({}));
    if (!res.ok) throw new Error(body.message || `HTTP ${res.status}`);
    dispatch(orderUpdated(body.order));
    dispatch(notifyOrderCancelled(body.orderId));
    return body.order;
  } catch (e) {
    dispatch(setError(e.message || "Failed to cancel order"));
    throw e;
  } finally {
    dispatch(setLoading(false));
  }
};
