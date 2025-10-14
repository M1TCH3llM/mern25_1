
import { LOAD_FROM_STORAGE, SAVE_SUCCESS } from "./ReviewsActions";

// === Initial State ===
const initialState = {
  byOrder: {},
  byProduct: {},
  _v: 1,
};

// === Reducer ===
export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FROM_STORAGE: {
      const loaded = action.payload;
      if (!loaded || typeof loaded !== "object") return state;
      // shallow-merge so future keys (_v) are preserved
      return { ...state, ...loaded };
    }

    case SAVE_SUCCESS: {
      // Expect a *normalized* payload from actions
      // payload: { orderId, order, products: [{productId, rating, comment}], createdAt }
      const { orderId, order, products = [], createdAt } = action.payload;

      // === byOrder ===
      const nextByOrder = {
        ...state.byOrder,
        [orderId]: {
          order: { ...order },
          products: Object.fromEntries(
            products.map((p) => [String(p.productId), { rating: p.rating, comment: p.comment }])
          ),
          createdAt,
        },
      };

      // === byProduct ===
      const nextByProduct = { ...state.byProduct };
      for (const p of products) {
        const pid = String(p.productId);
        const list = Array.isArray(nextByProduct[pid]) ? [...nextByProduct[pid]] : [];
        const row = { orderId, rating: p.rating, comment: p.comment, createdAt };

        const idx = list.findIndex((x) => String(x.orderId) === String(orderId));
        if (idx >= 0) {
          list[idx] = row; // upsert
        } else {
          list.unshift(row); // newest first
        }
        nextByProduct[pid] = list;
      }

      return {
        ...state,
        byOrder: nextByOrder,
        byProduct: nextByProduct,
      };
    }

    default:
      return state;
  }
}

// === Selectors ===
export const selectOrderReview = (state, orderId) =>
  state?.reviews?.byOrder?.[orderId] ?? null;

export const selectProductReviews = (state, productId) =>
  state?.reviews?.byProduct?.[String(productId)] ?? [];

export const selectProductReviewForOrder = (state, productId, orderId) => {
  const list = selectProductReviews(state, productId);
  return list.find((r) => String(r.orderId) === String(orderId)) ?? null;
};

export const hasAnyReviewForOrder = (state, orderId) =>
  !!selectOrderReview(state, orderId);

export const hasProductReviewForOrder = (state, productId, orderId) =>
  !!selectProductReviewForOrder(state, productId, orderId);
