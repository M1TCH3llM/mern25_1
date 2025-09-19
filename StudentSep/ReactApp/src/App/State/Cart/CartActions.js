import * as actionTypes from "../actionTypes";

const toCartItem = (product, qty = 1) => ({
  id: product._id,
  name: product.productName,
  price: Number(product.productPrice) || 0,
  desc: product.productDesc,
  qty: Number(qty) || 1,
});


export const addItem = (product, qty = 1) => ({
  type: actionTypes.ADD_ITEM,
  payload: toCartItem(product, qty),
});

// Remove item by id
export const removeItem = (id) => ({
  type: actionTypes.REMOVE_ITEM,
  payload: { id },
});

// Update item quantity by id
export const updateItemQty = (id, qty) => ({
  type: actionTypes.UPDATE_ITEM,
  payload: { id, qty: Math.max(1, Number(qty) || 1) },
});

// Empty the cart
export const emptyCart = () => ({ type: actionTypes.EMPTY_CART });