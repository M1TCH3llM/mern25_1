import React, { useEffect, useMemo } from "react";
import ReviewEditor from "./ReviewEditor";

export default function ReviewModal({
  open,
  onClose,
  orderId,
  items = [],
  canReview = true,
  onSubmit,
}) {
  const productItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.map((it, idx) => ({
      productId: it.productId ?? it.id ?? it._id ?? `p-${idx}`,
      name: it.name ?? it.productName ?? `Product ${idx + 1}`,
      image: it.image,
      qty: it.qty ?? it.quantity ?? 1,
      price: it.price,
    }));
  }, [items]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="notif-backdrop" onClick={() => onClose && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Review editor"
        className="notif-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 560,
          width: "100%",
          borderRadius: 12,
          // key bits for scrolling:
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header (stays visible) */}
        <div
          className="notif-modal-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 14px",
            borderBottom: "1px solid #eee",
            // optional sticky header for long forms
            position: "sticky",
            top: 0,
            zIndex: 1,
            background: "inherit",
          }}
        >
          <strong style={{ fontSize: 16 }}>
            Review Order #{String(orderId)}
          </strong>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              border: "1px solid #ddd",
              background: "#f8f8f8",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            padding: 12,
            overflowY: "auto",
            flex: 1,
            minHeight: 0, 
          }}
        >
          <ReviewEditor
            orderId={orderId}
            items={productItems}
            canReview={canReview}
            onSubmit={(payload) => {
              onSubmit && onSubmit(payload);
              onClose && onClose();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
