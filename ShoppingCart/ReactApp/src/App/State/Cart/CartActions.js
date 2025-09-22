// src/App/State/Cart/CartActions.js
import * as actionTypes from "../actionTypes";

/** Normalize product -> cart item */
const toCartItem = (product, qty = 1) => ({
  id: product._id,
  name: product.productName,
  price: Number(product.productPrice) || 0,
  desc: product.productDesc,
  image: product.imageUrl,
  qty: Math.max(1, Number(qty) || 1),
});

/** Add an item (or increase qty if it exists) */
export const addItem = (product, qty = 1) => ({
  type: actionTypes.ADD_ITEM,
  payload: toCartItem(product, qty),
});

/** Remove an item by id */
export const removeItem = (id) => ({
  type: actionTypes.REMOVE_ITEM,
  payload: { id },
});

/** Update quantity for an item id */
export const updateItemQty = (id, qty) => ({
  type: actionTypes.UPDATE_ITEM,
  payload: { id, qty: Math.max(1, Number(qty) || 1) },
});

/** Empty the entire cart */
export const emptyCart = () => ({ type: actionTypes.EMPTY_CART });

/** Save current cart to DB (creates a new Cart document) */
export const saveCartToDB = (opts = {}) => {
  const { userId } = opts;
  return async (dispatch, getState) => {
    const { cartState } = getState();
    const items = cartState.items || [];

    const payload = {
      userId,
      items: items.map((i) => ({
        productId: i.id,
        name: i.name,
        price: Number(i.price) || 0,
        qty: Math.max(1, Number(i.qty) || 1),
      })),
    };

    const res = await fetch("http://localhost:9000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Save failed (${res.status})`);
    }

    const savedCart = await res.json();
    // Optionally clear after save:
    // dispatch(emptyCart());
    return savedCart;
  };
};
