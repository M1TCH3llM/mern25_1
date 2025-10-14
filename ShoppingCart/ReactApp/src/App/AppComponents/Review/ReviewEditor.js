import React, { useMemo, useState } from "react";

export default function ReviewEditor({
  orderId,
  items = [],
  canReview = true,
  initial,
  onSubmit,
  onCancel,
}) {
  const productList = useMemo(
    () => (Array.isArray(items) ? items : []),
    [items]
  );

  const [orderReview, setOrderReview] = useState({
    rating: initial?.order?.rating ?? 0,
    comment: initial?.order?.comment ?? "",
  });

  const [productReviews, setProductReviews] = useState(() => {
    const map = {};
    for (const it of productList) {
      const pid = it.productId ?? it.id ?? it._id;
      map[pid] = {
        rating: initial?.products?.[pid]?.rating ?? 0,
        comment: initial?.products?.[pid]?.comment ?? "",
      };
    }
    return map;
  });

  const disabled = !canReview || !orderId || productList.length === 0;

  const setProdRating = (pid, value) =>
    setProductReviews((prev) => ({ ...prev, [pid]: { ...prev[pid], rating: value } }));

  const setProdComment = (pid, value) =>
    setProductReviews((prev) => ({ ...prev, [pid]: { ...prev[pid], comment: value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || !onSubmit) return;

    const productsPayload = productList.map((it) => {
      const pid = it.productId ?? it.id ?? it._id;
      const pr = productReviews[pid] || { rating: 0, comment: "" };
      return {
        productId: pid,
        name: it.name ?? it.productName ?? "",
        rating: clamp(pr.rating, 0, 5),
        comment: (pr.comment || "").trim(),
      };
    });

    const payload = {
      orderId,
      order: {
        rating: clamp(orderReview.rating, 0, 5),
        comment: (orderReview.comment || "").trim(),
      },
      products: productsPayload,
      createdAt: Date.now(),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <header>
        <h3>Leave a Review</h3>
        <div>Order #{String(orderId)}</div>
      </header>

      {/* Overall order review */}
      <section style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Overall Order</div>
        <div className="review-stars">
          <Stars
            value={orderReview.rating}
            onChange={(v) => setOrderReview((o) => ({ ...o, rating: v }))}
            disabled={!canReview}
          />
        </div>
        <textarea
          placeholder="How was your overall experience?"
          value={orderReview.comment}
          onChange={(e) =>
            setOrderReview((o) => ({ ...o, comment: e.target.value }))
          }
          disabled={!canReview}
          rows={3}
        />
      </section>

      {/* Per-product reviews */}
      <section>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Products</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
          {productList.map((it) => {
            const pid = it.productId ?? it.id ?? it._id;
            const pr = productReviews[pid] || { rating: 0, comment: "" };
            return (
              <li key={pid} className="review-product">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  {it.image && (
                    <img
                      src={it.image}
                      alt={it.name || "product"}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                  )}
                  <div style={{ fontWeight: 600 }}>
                    {it.name ?? it.productName ?? `Product ${pid}`}
                  </div>
                </div>

                <div className="review-stars">
                  <Stars
                    value={pr.rating}
                    onChange={(v) => setProdRating(pid, v)}
                    disabled={!canReview}
                  />
                </div>
                <textarea
                  placeholder="Share your thoughts about this product"
                  value={pr.comment}
                  onChange={(e) => setProdComment(pid, e.target.value)}
                  disabled={!canReview}
                  rows={2}
                />
              </li>
            );
          })}
        </ul>
      </section>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button
          type="submit"
          disabled={disabled}
          className="button-primary"
          title={canReview ? "Submit reviews" : "You can review after the cancel option is gone"}
        >
          Submit Reviews
        </button>
        {onCancel && (
          <button type="button" className="button-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

/* Stars (red when selected, stays highlighted; hover preview supported) */
function Stars({ value = 0, onChange, disabled = false }) {
  const [hover, setHover] = useState(null);
  const active = hover ?? value;

  const baseBtn = {
    appearance: "none",
    border: "none",
    background: "transparent",
    padding: 0,
    margin: 0,
    cursor: disabled ? "default" : "pointer",
    fontSize: 24,
    lineHeight: 1,
    transition: "transform 120ms ease, color 120ms ease",
  };

  const starStyle = (n) => ({
    ...baseBtn,
    color: n <= active ? "#e11d48" /* red-600 */ : "#cbd5e1" /* slate-300 */,
    transform: n <= active && hover != null ? "scale(1.05)" : "none",
  });

  return (
    <div role="group" aria-label="Star rating" style={{ display: "inline-flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          style={starStyle(n)}
          onMouseEnter={() => !disabled && setHover(n)}
          onMouseLeave={() => !disabled && setHover(null)}
          onFocus={() => !disabled && setHover(n)}
          onBlur={() => !disabled && setHover(null)}
          onClick={() => !disabled && onChange && onChange(n)}
          aria-label={`${n} star${n === 1 ? "" : "s"}`}
          aria-pressed={value >= n}
          disabled={disabled}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, Number(n) || 0));
}
