export const selectCartItems = (state) => state.cartState.items;

export const selectCartCount = (state) =>
  state.cartState.items.reduce((sum, i) => sum + (i.qty || 1), 0);

export const selectCartSubtotal = (state) =>
  state.cartState.items.reduce((sum, i) => sum + (Number(i.price) * (i.qty || 1)), 0);