import * as actionTypes from "../actionTypes";

const initial = { loading: false, error: null, orders: [] };

export default function recentOrdersReducer(state = initial, action) {
  switch (action.type) {
    case actionTypes.ORDERS_LOADING:
      return { ...state, loading: !!action.payload };
    case actionTypes.ORDERS_ERROR:
      return { ...state, error: action.payload || null };
    case actionTypes.ORDERS_SET:
      return { ...state, error: null, orders: Array.isArray(action.payload) ? action.payload : [] };
    case actionTypes.ORDER_UPDATED: {
      const upd = action.payload;
      const orders = state.orders.map(o => (o._id === upd._id ? upd : o));
      return { ...state, orders };
    }
    default:
      return state;
  }
}
