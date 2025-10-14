// Actions + Thunks for Reviews
// Pairs with ReviewsReducer.js (which imports these type constants)

export const LOAD_FROM_STORAGE = "reviews/LOAD_FROM_STORAGE";
export const SAVE_SUCCESS = "reviews/SAVE_SUCCESS";

// ==== Actions ====
export const saveReviews = (payload) => (dispatch, getState) => {
  const clean = normalizePayload(payload);
  dispatch({ type: SAVE_SUCCESS, payload: clean });

  // persist to localStorage
  try {
    const state = getState()?.reviews;
    if (state) {
      localStorage.setItem("reviews_v1", JSON.stringify(state));
    }
  } catch {}

  return clean;
};

/** Load reviews from localStorage into redux (call once on app start if you want persistence) */
export const loadReviewsFromStorage = () => (dispatch) => {
  try {
    const raw = localStorage.getItem("reviews_v1");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      dispatch({ type: LOAD_FROM_STORAGE, payload: parsed });
    }
  } catch {}
};

// ==== Helpers ====
function normalizePayload(p) {
  const now = Date.now();
  const orderId = String(p?.orderId ?? "");
  const order = {
    rating: clamp(p?.order?.rating, 0, 5),
    comment: (p?.order?.comment || "").trim(),
  };
  const products = Array.isArray(p?.products)
    ? p.products.map((x) => ({
        productId: String(x.productId),
        rating: clamp(x.rating, 0, 5),
        comment: (x.comment || "").trim(),
      }))
    : [];
  const createdAt = Number(p?.createdAt) || now;

  return { orderId, order, products, createdAt };
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, Number(n) || 0));
}
