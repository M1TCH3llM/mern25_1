import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCoupon } from "../../State/Coupon/CouponActions";

export default function CouponComponent() {
  const dispatch = useDispatch();
  const coupon = useSelector((s) => s.couponState?.value);

  return (
    <section style={{ maxWidth: 600, margin: "20px auto", padding: 16 }}>
      <h2>Coupons</h2>
      <button
        onClick={() => dispatch(generateCoupon())}
        className="button"
        style={{ padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}
      >
        Generate Coupon
      </button>
    <small style={{ display: "block", marginTop: 8, color: "#666" }}>
          Your coupon is saved and will be applied automatically at checkout (10% off).
    </small>

      <div style={{ marginTop: 12 }}>
        {coupon ? (
          <div>
            Current Coupon:&nbsp;
            <strong style={{ fontSize: 20 }}>{coupon}</strong>
          </div>
        ) : (
          <em>No coupon generated yet.</em>
        )}
      </div>
    </section>
  );
}
