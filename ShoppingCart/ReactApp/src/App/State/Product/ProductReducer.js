const initialState = {
  product: { productName: "", productPrice: 0, productDesc: "", rating: 0, _id: undefined },
  products: [],
  error: ""
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "PRODUCT_SAVE_SUCCESS": {
      const saved = action.payload;
      return {
        ...state,
        product: saved,
        products: [saved, ...state.products],
        error: ""
      };
    }

    case "PRODUCT_DELETE_SUCCESS":
  return {
    ...state,
    products: state.products.filter(p => p._id !== action.payload),
    product:
      state.product && state.product._id === action.payload
        ? { productName: "", productPrice: 0, productDesc: "", rating: 0, _id: undefined }
        : state.product,
    error: ""
  };

  case "PRODUCT_UPDATE_SUCCESS": {
    const u = action.payload;
    return {
        ...state,
        product: u,
        products: state.products.map(p => (p._id === u._id ? u : p)),
        error: ""
      };
    }
case "PRODUCT_UPDATE_ERROR":
  return { ...state, error: action.payload || "Failed to update product" };

    case "PRODUCT_DELETE_ERROR":
      return { ...state, error: action.payload || "Failed to delete product" };

    case "PRODUCT_SAVE_ERROR":
      return { ...state, error: action.payload || "Failed to save product" };

    case "PRODUCT_LIST_SUCCESS":
      return { ...state, products: action.payload, error: "" };

    case "PRODUCT_LIST_ERROR":
      return { ...state, error: action.payload || "Failed to fetch products" };

    case "PRODUCT_CLEAR_ERROR":
      return { ...state, error: "" };

    default:
      return state;
  }
}