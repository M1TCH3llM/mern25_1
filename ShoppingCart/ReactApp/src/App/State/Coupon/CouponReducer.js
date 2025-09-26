import * as actionTypes from "../actionTypes";

const initialState = { value: null };

export default function couponReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_COUPON:
      return { ...state, value: action.payload };
    default:
      return state;
  }
}
