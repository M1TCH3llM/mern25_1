// src/App/Components/Checkout/CheckoutPage.js
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const fmt = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(Number(n) || 0);

export default function CheckoutPage() {
  const [showPaymentPanel, setShowPaymentPanel] = useState(false);
  const [paid, setPaid] = useState(false);

  // existing selectors
  const items  = useSelector((s) => s.cartState?.items || []);
  const user   = useSelector((s) => s.userState?.user) || {};
  // coupon from state
  const coupon = useSelector((s) => s.couponState?.value || null);

  // Totals
  const { totalQty, totalAmount } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        const qty = Math.max(1, Number(i.qty) || 1);
        const price = Number(i.price) || 0;
        acc.totalQty += qty;
        acc.totalAmount += qty * price;
        return acc;
      },
      { totalQty: 0, totalAmount: 0 }
    );
  }, [items]);

  //10% discount if a coupon exists
  const discount = coupon ? totalAmount * 0.10 : 0;
  const grandTotal = Math.max(0, totalAmount - discount);

  if (paid) {
    return (
      <section style={{ maxWidth: 1100, margin: "20px auto", padding: 16 }}>
        <h1>Payment Page</h1>
        <p style={{ marginTop: 12, fontSize: 18 }}>
          Thank you for the payment, your items are under process!
        </p>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 1100, margin: "20px auto", padding: 16 }}>
      <h1>{showPaymentPanel ? "Payment Page" : "Checkout"}</h1>

      {!showPaymentPanel && (
        <>
          {/* Delivery */}
          <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginTop: 12 }}>
            <h3>Deliver To</h3>
            <p><strong>{user.userName || "Guest User"}</strong></p>
            <p>{user.street || "No address on file"}</p>
            {user.mobile ? <p>Mobile: {user.mobile}</p> : null}
            <small>We will deliver products to the above address.</small>
          </div>

          {/* Cart table */}
          <div style={{ marginTop: 16, overflowX: "auto", border: "1px solid #eee", borderRadius: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead style={{ background: "#f7f7f7", textAlign: "left" }}>
                <tr>
                  <th style={{ padding: 12 }}>Product</th>
                  <th style={{ padding: 12 }}>Price</th>
                  <th style={{ padding: 12 }}>Qty</th>
                  <th style={{ padding: 12 }}>Line total</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr><td style={{ padding: 12 }} colSpan={4}>Your cart is empty.</td></tr>
                )}
                {items.map((item, idx) => {
                  const qty = Math.max(1, Number(item.qty) || 1);
                  const price = Number(item.price) || 0;
                  const line = qty * price;
                  return (
                    <tr key={item.id ?? idx} style={{ borderTop: "1px solid #eee" }}>
                      <td style={{ padding: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          {item.image ? (
                            <img src={item.image} alt="" width={48} height={48} style={{ objectFit: "cover", borderRadius: 8 }} />
                          ) : null}
                          <div>
                            <div style={{ fontWeight: 600 }}>{item.name || `Item ${idx + 1}`}</div>
                            {item.desc ? (
                              <div style={{ color: "#666", maxWidth: 480, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {item.desc}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: 12 }}>{fmt(price)}</td>
                      <td style={{ padding: 12 }}>{qty}</td>
                      <td style={{ padding: 12, fontWeight: 600 }}>{fmt(line)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ padding: 12 }} colSpan={2}><strong>Totals</strong></td>
                  <td style={{ padding: 12 }}><strong>{totalQty}</strong></td>
                  <td style={{ padding: 12 }}><strong>{fmt(totalAmount)}</strong></td>
                </tr>

                {/* NEW: coupon + discount rows */}
                {coupon && (
                  <>
                    <tr>
                      <td style={{ padding: 12 }} colSpan={3}>
                        <span>Coupon applied: <strong>{coupon}</strong> (10% off)</span>
                      </td>
                      <td style={{ padding: 12, color: "#0a7", fontWeight: 600 }}>
                        − {fmt(discount)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: 12 }} colSpan={3}><strong>Grand Total</strong></td>
                      <td style={{ padding: 12, fontWeight: 700 }}>{fmt(grandTotal)}</td>
                    </tr>
                  </>
                )}

                {!coupon && (
                  <tr>
                    <td style={{ padding: 12 }} colSpan={3}><strong>Grand Total</strong></td>
                    <td style={{ padding: 12, fontWeight: 700 }}>{fmt(grandTotal)}</td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>

          {/* Proceed to Payment */}
          <button
            style={{ marginTop: 16, padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}
            onClick={() => setShowPaymentPanel(true)}
            disabled={items.length === 0}
            title={items.length === 0 ? "Your cart is empty" : "Proceed to payment"}
          >
            Proceed to Payment
          </button>
        </>
      )}

      {/* Payment panel */}
      {showPaymentPanel && (
        <div style={{ marginTop: 16 }}>
          <p style={{ marginBottom: 12 }}>
            Review your payment details and confirm to complete your order.
          </p>
          <button
            style={{ padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}
            onClick={() => setPaid(true)}
          >
            Make Payment
          </button>
        </div>
      )}
    </section>
  );
}


