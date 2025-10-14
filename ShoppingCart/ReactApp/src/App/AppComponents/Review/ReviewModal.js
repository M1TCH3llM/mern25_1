import React, { useEffect, useMemo, useRef, useState } from "react";
import ReviewEditor from "./ReviewEditor";

export default function ReviewModal({
  open,
  onClose,
  orderId,
  items = [],
  canReview = true,
  onSubmit,
  anchorRect,
}) {
  const panelRef = useRef(null);
  const [pos, setPos] = useState({ top: null, left: null, placement: "center" });

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

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Position relative to anchor (if provided)
  useEffect(() => {
    if (!open) return;

    const place = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (!anchorRect) {
        setPos({ top: null, left: null, placement: "center" });
        return;
      }

      const width = Math.min(560, vw - 24);
      const height = Math.min(0.7 * vh, vh - 24);

      const topBelow = Math.min(anchorRect.bottom + 8, vh - height - 12);
      const leftAlign = Math.min(Math.max(12, anchorRect.left), vw - width - 12);

      setPos({ top: topBelow, left: leftAlign, placement: "anchored" });
    };

    place();
    const onResize = () => place();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [open, anchorRect]);

  if (!open) return null;

  return (
    <div className="notif-backdrop" onClick={() => onClose && onClose()}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Review editor"
        className="notif-modal"
        onClick={(e) => e.stopPropagation()}
        style={
          pos.placement === "center"
            ? { position: "relative" } // centered by .notif-backdrop flex
            : {
                position: "fixed",
                top: pos.top ?? 80,
                left: pos.left ?? 24,
                transform: "none",
              }
        }
      >
        <div className="notif-modal-header">
          <strong>Review Order #{String(orderId)}</strong>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </div>

        <div style={{ padding: 8 }}>
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
