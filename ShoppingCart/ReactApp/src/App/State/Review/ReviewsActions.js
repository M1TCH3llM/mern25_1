// src/App/State/Review/ReviewsActions.js

export const LOAD_FROM_STORAGE = "reviews/LOAD_FROM_STORAGE";
export const SAVE_SUCCESS = "reviews/SAVE_SUCCESS";

// === helpers ===
const API_BASE = `${((typeof window !== "undefined" && window.API_ORIGIN) || "http://localhost:9000")}/review`;

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, Number(n) || 0));

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
        name: (x.name || x.productName || "").trim(),     
        rating: clamp(x.rating, 0, 5),
        comment: (x.comment || "").trim(),
      }))
    : [];

  const createdAt = Number(p?.createdAt) || now;

  return { orderId, order, products, createdAt };
}

// === Local-only actions (still available as fallback)===
export const saveReviewsLocal = (payload) => (dispatch, getState) => {
  const clean = normalizePayload(payload);
  dispatch({ type: SAVE_SUCCESS, payload: clean });

  try {
    const state = getState()?.reviews;
    if (state) localStorage.setItem("reviews_v1", JSON.stringify(state));
  } catch {}
  return clean;
};

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

// === POST /review (server) with name preserved ===
export const postReview = (payload) => async (dispatch, getState) => {
  // Build a clean body that *keeps name*
  const clean = normalizePayload(payload);

  const userId =
    payload?.userId ||
    getState()?.userState?.user?._id ||
    getState()?.userState?.user?.id ||
    "";

  try {
    const res = await fetch(`${API_BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...clean, userId }),
    });

    if (!res.ok) {
      const err = await safeJson(res);
      throw new Error(err?.error || err?.message || `HTTP ${res.status}`);
    }

    const saved = await res.json();
    const normalizedBack = normalizePayload(saved);
    dispatch({ type: SAVE_SUCCESS, payload: normalizedBack });

    try {
      const state = getState()?.reviews;
      if (state) localStorage.setItem("reviews_v1", JSON.stringify(state));
    } catch {}

    return normalizedBack;
  } catch (e) {
    console.warn("[reviews] POST failed, falling back to local save:", e?.message);
    return dispatch(saveReviewsLocal({ ...clean, userId }));
  }
};

// === GET /review/by-order/:userId/:orderId (prefill editor) ===
export const fetchReviewForOrder = (orderId) => async (dispatch, getState) => {
  const userId =
    getState()?.userState?.user?._id ||
    getState()?.userState?.user?.id ||
    "";

  if (!userId || !orderId) return null;

  try {
    const res = await fetch(
      `${API_BASE}/by-order/${encodeURIComponent(userId)}/${encodeURIComponent(orderId)}`,
      { credentials: "include" }
    );
    if (!res.ok) {
      const err = await safeJson(res);
      throw new Error(err?.error || err?.message || `HTTP ${res.status}`);
    }
    const doc = await res.json();
    if (doc && typeof doc === "object") {
      const normalized = normalizePayload(doc); // keeps product.name
      dispatch({ type: SAVE_SUCCESS, payload: normalized }); // upsert cache
      return normalized;
    }
    return null;
  } catch (e) {
    console.warn("[reviews] GET by-order failed:", e?.message);
    return null;
  }
};

// === (Optional) GET /review/all ===
export const fetchAllPublicReviews = (limit = 500) => async () => {
  try {
    const res = await fetch(`${API_BASE}/all?limit=${encodeURIComponent(limit)}`, {
      credentials: "include",
    });
    if (!res.ok) {
      const err = await safeJson(res);
      throw new Error(err?.error || err?.message || `HTTP ${res.status}`);
    }
    const data = await res.json();
    // shape: { reviews: [{ userId, orderId, order, products:[{productId, name, rating, comment}], author:{userId,userName}, createdAt }, ...] }
    return Array.isArray(data?.reviews) ? data.reviews : [];
  } catch (e) {
    console.warn("[reviews] fetchAllPublicReviews failed:", e?.message);
    return [];
  }
};

// helper
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
