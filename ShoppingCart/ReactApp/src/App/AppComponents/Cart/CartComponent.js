import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { updateItemQty, removeItem, emptyCart,saveCartToDB } from "../../State/Cart/CartActions";

// simple currency formatter
const fmt = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(Number(n) || 0);


const CartPage = ({ items, subtotal, updateQty, remove, clear, save }) => {
  if (!items.length) {
    return (
      <div style={{ maxWidth: 960, margin: "20px auto", padding: 16 }}>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <NavLink to="/product" className="button">Browse products</NavLink>
      </div>
    );
  }
const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 1100, margin: "20px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Your Cart</h2>
        <button onClick={clear} className="button" style={{ background: "#eee" }}>
          Clear cart
        </button>
      </div>

      <div style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 8, marginTop: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead style={{ background: "#f7f7f7", textAlign: "left" }}>
            <tr>
              <th style={{ padding: 12 }}>Product</th>
              <th style={{ padding: 12 }}>Price</th>
              <th style={{ padding: 12 }}>Qty</th>
              <th style={{ padding: 12 }}>Line total</th>
              <th style={{ padding: 12 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const line = (Number(item.price) || 0) * (item.qty || 1);
              return (
                <tr key={item.id} style={{ borderTop: "1px solid #eee" }}>
                  <td style={{ padding: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          width={48}
                          height={48}
                          style={{ objectFit: "cover", borderRadius: 8 }}
                        />
                      ) : null}
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        {item.desc ? (
                          <div style={{ color: "#666", maxWidth: 480, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {item.desc}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: 12 }}>{fmt(item.price)}</td>
                  <td style={{ padding: 12 }}>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, e.target.value)}
                      style={{ width: 72, padding: "6px 8px", border: "1px solid #ccc", borderRadius: 6 }}
                    />
                  </td>
                  <td style={{ padding: 12, fontWeight: 600 }}>{fmt(line)}</td>
                  <td style={{ padding: 12, textAlign: "right" }}>
                    <button
                      onClick={() => remove(item.id)}
                      className="button"
                      style={{ background: "#fee", color: "#b00", border: "1px solid #fbb", padding: "6px 10px", borderRadius: 6 }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16, alignItems: "center" }}>
        <div style={{ fontSize: 18 }}>
          Subtotal: <strong>{fmt(subtotal)}</strong>
        </div>
       <button
          className="button"
          style={{ background: "#111", color: "#fff", padding: "10px 16px", borderRadius: 8 }}
          onClick={async () => {
            try {
              await save({});
              alert("Cart saved. You can proceed to checkout.");
            } catch (e) {
              alert(e.message || "Failed to save cart.");
            }
          }}>
          Save to Checkout
        </button>

        <button
          className="button"
          style={{ padding: "10px 16px", borderRadius: 8 }}
          onClick={() => navigate("/checkout")}>
          Go to Checkout
        </button>
      </div>
    </div>
  );
};

// Cart Math
const mapStateToProps = (state) => {
  const items = (state.cartState && state.cartState.items) || []; // 
  const subtotal = items.reduce((sum, i) => sum + (Number(i.price) * (i.qty || 1)), 0); // sum up line totals
  return { items, subtotal }; // subtotal is pre-calculated
};

// Cart Actions
const mapDispatchToProps = (dispatch) => ({
  updateQty: (id, qty) => dispatch(updateItemQty(id, qty)), // ensure qty is 1 or more
  remove: (id) => dispatch(removeItem(id)), // remove by id
  clear: () => dispatch(emptyCart()), // empty the cart
  save: (opts) => dispatch(saveCartToDB(opts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
