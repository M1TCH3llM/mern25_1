import * as actionTypes from "../actionTypes";

export const addCoupon = (code) => ({
  type: actionTypes.ADD_COUPON,
  payload: String(code),
});

// 6-digit numeric coupon
export const generateCoupon = () => (dispatch) => {
  const n = Math.floor(Math.random() * 1_000_000); // random number between 0 and 999999
  const code = n.toString().padStart(6, "0"); // pad with leading zeros to ensure 6 digits
  dispatch(addCoupon(code)); // dispatch the action to add the coupon
  return code;
};
