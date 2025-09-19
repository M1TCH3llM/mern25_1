import * as actionTypes from "../actionTypes";

const readInitial = () => {
  try {
    const raw = localStorage.getItem("cart_v1"); // read from local storage
    const parsed = raw ? JSON.parse(raw) : null; // parse to json
    if (parsed && Array.isArray(parsed.items)) return { items: parsed.items }; // valid data
  } catch (_) {}
  return { items: [] }; // default value
};

const initialState = readInitial(); 

const findIndexById = (items, id) => items.findIndex(i => i.id === id); // find index by id helper

export default function cartReducer(state = initialState, action) { // reducer function
  switch (action.type) { // switch case for action types
    case actionTypes.ADD_ITEM: {  // add item to cart
      const item = action.payload;  // item to add
      const idx = findIndexById(state.items, item.id); // find if item already exists
     // if exists, update quantity
      if (idx >= 0) {
        const items = [...state.items];
        const current = items[idx];
        items[idx] = { ...current, qty: (current.qty || 1) + (item.qty || 1) }; 
        return { ...state, items };
      }
      return { ...state, items: [...state.items, item] };
    }

    case actionTypes.UPDATE_ITEM: {
      const { id, qty } = action.payload;
      const safeQty = Math.max(1, Number(qty) || 1);
      return {
        ...state,
        items: state.items.map(i => (i.id === id ? { ...i, qty: safeQty } : i)),
      };
    }

    case actionTypes.REMOVE_ITEM: {
      const { id } = action.payload;
      return { ...state, items: state.items.filter(i => i.id !== id) };
    }

    case actionTypes.EMPTY_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
}
