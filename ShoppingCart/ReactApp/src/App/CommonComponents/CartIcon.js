import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


export default function CartBadge({ to = "/cart", className = "button", style, label = "Cart" }) {
  const count = useSelector((s) =>
    Array.isArray(s?.cartState?.items) ? s.cartState.items.length : 0
  );

  return (
    <div style={{ position: "relative", display: "inline-block", ...(style || {}) }}>
      <NavLink to={to} className={className}>{label}</NavLink>
      {count > 0 && (
        <span
          title={`${count} in cart`}
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            minWidth: 20,
            height: 20,
            padding: "0 6px",
            borderRadius: 10,
            fontSize: 12,
            lineHeight: "20px",
            textAlign: "center",
            background: "#0d6efd",
            color: "#fff",
            fontWeight: 700,
            boxShadow: "0 2px 6px rgba(0,0,0,.35)",
            userSelect: "none",
            pointerEvents: "none", // badge itself not clickable
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
