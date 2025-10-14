import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders, cancelOrder } from "../../State/Orders/RecentOrdersActions";
import { saveReviews } from "../../State/Review/ReviewsActions";
import ReviewModal from "../Review/ReviewModal";

const fmt = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" })
    .format(Number(n) || 0);

export default function RecentOrders() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.userState?.user);
  const { orders, loading, error } = useSelector((s) => s.ordersState);

  // --- Review Modal state (must be INSIDE component) ---
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewAnchor, setReviewAnchor] = useState(null);
  const [reviewOrderId, setReviewOrderId] = useState(null);
  const [reviewItems, setReviewItems] = useState([]);
  const [reviewCanReview, setReviewCanReview] = useState(true);

  useEffect(() => {
    if (user?._id) dispatch(fetchMyOrders(user._id));
  }, [dispatch, user?._id]);

  const tryCancel = async (o) => {
    try {
      await dispatch(cancelOrder({ orderId: o._id, userId: user._id }));
    } catch (e) {
      alert(e.message || "Cancel failed");
    }
  };

  const openReview = (o, evt) => {
    const rect = evt?.currentTarget?.getBoundingClientRect?.() ?? null;

    const statusUpper = (o.status || "").toUpperCase();
    const cancelByMs = Number.isFinite(new Date(o.cancelBy).getTime())
      ? new Date(o.cancelBy).getTime()
      : 0;
    const cancellable = statusUpper === "PLACED" && Date.now() < cancelByMs;
    const canReview = !cancellable && statusUpper !== "CANCELLED";

    setReviewOrderId(o._id);
    setReviewItems(Array.isArray(o.items) ? o.items : []);
    setReviewCanReview(!!canReview);
    setReviewAnchor(rect);
    setReviewOpen(true);
  };

  const closeReview = () => {
    setReviewOpen(false);
    setReviewAnchor(null);
    setReviewOrderId(null);
    setReviewItems([]);
  };

  const handleSaveReviews = (payload) => {
    dispatch(saveReviews(payload));
    closeReview();
  };

  return (
    <section style={{ maxWidth: 1000, margin: "20px auto", padding: 16 }}>
      <h2>Recent Orders</h2>
      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      {!orders?.length && !loading ? <em>No orders yet.</em> : null}

      {orders?.map((o) => {
        const statusUpper = (o.status || "").toUpperCase();
        const cancelByMs = Number.isFinite(new Date(o.cancelBy).getTime())
          ? new Date(o.cancelBy).getTime()
          : 0;
        const cancellable = statusUpper === "PLACED" && Date.now() < cancelByMs;
        const canReview = !cancellable && statusUpper !== "CANCELLED";
       
return (
          <div
            key={o._id}
            style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginTop: 12 }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}
            >
              <div>
                <strong>Order #{o._id.slice(-6)}</strong> •{" "}
                {new Date(o.createdAt).toLocaleString()}
                <div>
                  Status: <strong>{o.status}</strong>
                </div>
                {o.coupon ? (
                  <div>
                    Coupon: <code>{o.coupon}</code> (10% off)
                  </div>
                ) : null}
                <div>
                  Subtotal: {fmt(o.subtotal)} &nbsp;|&nbsp; Discount: −{fmt(o.discount)} &nbsp;|&nbsp; Total:{" "}
                  <strong>{fmt(o.grandTotal)}</strong>
                </div>
                <div>Cancel by: {new Date(o.cancelBy).toLocaleString()}</div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {/* Review (only when not cancellable and not cancelled) */}
                <button
                type="button"
                  className="button"
                  disabled={!canReview}
                  title={
                    canReview
                      ? "Review this order"
                      : "You can review after the cancel option is gone"
                  }
                  onClick={(e) => openReview(o, e)}
                  style={{ padding: "6px 10px", borderRadius: 8, opacity: canReview ? 1 : 0.6 }}
                >
                  Review
                </button>

                {/* Cancel */}
                <button
                  disabled={!cancellable}
                  onClick={() => tryCancel(o)}
                  className="button"
                  title={
                    cancellable ? "Cancel this order" : "Order can no longer be cancelled"
                  }
                  style={{ padding: "6px 10px", borderRadius: 8, opacity: cancellable ? 1 : 0.6 }}
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Items */}
            <div style={{ marginTop: 10, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead style={{ background: "#f7f7f7" }}>
                  <tr>
                    <th style={{ padding: 8, textAlign: "left" }}>Product</th>
                    <th style={{ padding: 8, textAlign: "left" }}>Price</th>
                    <th style={{ padding: 8, textAlign: "left" }}>Qty</th>
                    <th style={{ padding: 8, textAlign: "left" }}>Line</th>
                  </tr>
                </thead>
                <tbody>
                  {o.items.map((it, idx) => {
                    const line = (Number(it.price) || 0) * (Number(it.qty) || 1);
                    return (
                      <tr key={idx} style={{ borderTop: "1px solid #eee" }}>
                        <td style={{ padding: 8 }}>{it.name}</td>
                        <td style={{ padding: 8 }}>{fmt(it.price)}</td>
                        <td style={{ padding: 8 }}>{it.qty}</td>
                        <td style={{ padding: 8 }}>{fmt(line)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* Single modal instance outside the map */}
      <ReviewModal
        open={reviewOpen}
        onClose={closeReview}
        orderId={reviewOrderId}
        items={reviewItems}
        canReview={reviewCanReview}
        onSubmit={handleSaveReviews}
        anchorRect={reviewAnchor}
      />
    </section>
  );
}
