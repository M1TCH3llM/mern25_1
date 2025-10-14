// Reducer for Notifications
// Pair with actions from `notifications.actions.js`

import {
  NOTIF_ADD,
  NOTIF_UPSERT,
  NOTIF_MARK_READ,
  NOTIF_MARK_ALL_READ,
  NOTIF_CLEAR,
} from "./NotificationActions.js";

// === Initial State ===
const initialState = {
  items: [
    // shape:
    // { id, type: "static"|"dynamic", label, read: false, href?, createdAt }
  ],
};

// ===== Reducer =====
export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIF_ADD: {
      return { ...state, items: [action.payload, ...state.items] };
    }

    case NOTIF_UPSERT: {
      const next = [...state.items];
      const idx = next.findIndex((n) => n.id === action.payload.id);
      if (idx >= 0) next[idx] = { ...next[idx], ...action.payload };
      else next.unshift(action.payload);
      return { ...state, items: next };
    }

    case NOTIF_MARK_READ: {
      const next = state.items.map((n) =>
        n.id === action.payload ? { ...n, read: true } : n
      );
      return { ...state, items: next };
    }

    case NOTIF_MARK_ALL_READ: {
      const next = state.items.map((n) => ({ ...n, read: true }));
      return { ...state, items: next };
    }

    case NOTIF_CLEAR: {
      // If no id provided, clear all; else remove that id
      if (!action.payload) return { ...state, items: [] };
      const next = state.items.filter((n) => n.id !== action.payload);
      return { ...state, items: next };
    }

    default:
      return state;
  }
}

export const selectNotifications = (state) => state.notifications.items;

export const selectUnreadCount = (state) =>
  state.notifications.items.reduce((n, i) => n + (i.read ? 0 : 1), 0);
