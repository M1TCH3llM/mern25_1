import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import ReviewEditor from "./ReviewEditor";
import { saveReviews } from "../../State/Review/ReviewsActions";

export default function ReviewComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const qOrderId = params.get("orderId");

  // === Pull recent orders from your store ===
  const orders = useSelector((s) => {
    const o = s?.ordersState;
    if (!o) return [];
    if (Array.isArray(o)) return o;
    if (Array.isArray(o?.list)) return o.list;
    if (Array.isArray(o?.orders)) return o.orders;
    if (Array.isArray(o?.data)) return o.data;
    return [];
  });

  // Normalize orders a bit
  const normalized = useMemo(() => {
    return orders
      .map((o) => ({
        raw: o,
        id: o.orderId ?? o.id ?? o._id ?? o.number ?? o.code,
        status: (o.status || "").toUpperCase(),
        canCancel: !!(o.canCancel ?? o.cancellable ?? o.allowCancel ?? false),
        items: normalizeItems(o.items ?? o.products ?? o.lines ?? []),
        placedAt: o.createdAt ?? o.placedAt ?? o.orderDate ?? 0,
      }))
      .filter((o) => o.id != null);
  }, [orders]);

  // Choose the order to review
  const selected = useMemo(() => {
    if (!normalized.length) return null;

    if (qOrderId != null) {
      const byId = normalized.find((o) => String(o.id) === String(qOrderId));
      if (byId) return byId;
    }

    const eligible = normalized.filter(
      (o) =>
        ["DELIVERED", "COMPLETED", "FULFILLED", "SHIPPED"].includes(o.status) &&
        !o.canCancel
    );

    if (eligible.length) {
      return [...eligible].sort((a, b) => (b.placedAt || 0) - (a.placedAt || 0))[0];
    }

    return normalized[0];
  }, [normalized, qOrderId]);

  // Can review rule: only when cancel button is gone and not cancelled
  const canReview = !!(selected && !selected.canCancel && selected.status !== "CANCELLED");

  // Save to Redux, then go back to orders
  const handleSubmit = (payload) => {
    dispatch(saveReviews(payload));
    navigate("/resentOrders");
  };

  if (!normalized.length) {
    return (
      <div style={pageBox}>
        <h3>Reviews</h3>
        <p>No recent orders found. Please place an order first.</p>
        <NavLink to="/product" className="button">Browse Products</NavLink>
      </div>
    );
  }

  if (!selected) {
    return (
      <div style={pageBox}>
        <h3>Reviews</h3>
        <p>No matching order. Pick one to review:</p>
        <ul>
          {normalized.map((o) => (
            <li key={String(o.id)}>
              <NavLink to={`/review?orderId=${encodeURIComponent(o.id)}`}>
                Review Order #{String(o.id)} ({o.status})
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div style={pageBox}>
      <ReviewEditor
        orderId={selected.id}
        items={selected.items}
        canReview={canReview}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/resentOrders")}
      />

      {/* Quick links */}
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <NavLink to="/resentOrders" className="button">Back to Orders</NavLink>
        <NavLink to="/home" className="button">Home</NavLink>
      </div>
    </div>
  );
}

/* ======= helpers & styles ======= */

function normalizeItems(items) {
  if (!Array.isArray(items)) return [];
  return items.map((it, idx) => ({
    productId: it.productId ?? it.id ?? it._id ?? it.sku ?? `p-${idx}`,
    name: it.name ?? it.productName ?? it.title ?? `Product ${idx + 1}`,
    image: it.image ?? it.img ?? it.thumbnail ?? undefined,
    qty: it.qty ?? it.quantity ?? 1,
    price: it.price ?? it.unitPrice ?? it.amount ?? undefined,
  }));
}

const pageBox = {
  maxWidth: 960,
  margin: "0 auto",
  padding: 16,
};
