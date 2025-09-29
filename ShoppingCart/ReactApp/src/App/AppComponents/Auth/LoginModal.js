import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SaveUserToDBUsingFetch } from "../../State/User/UserAction";

export default function LoginModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(""); 
  const [password, setPassword] = useState(""); 

  // don't render anything if not open
  if (!open) return null;

  // handle form submit
  const submit = async (e) => {
    e.preventDefault();
    try {
      // send only what your API needs
      await dispatch(SaveUserToDBUsingFetch({ userName, password }));
      onClose?.();
    } catch (err) {
      alert(err?.message || "Login failed");
    }
  };

  return (
    <div style={backdrop} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>Sign in</h3>
        <form onSubmit={submit}>
          <div style={row}>
            <label style={label}>Username</label>
            <input
              style={input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User Name"
              required
            />
          </div>
          <div style={row}>
            <label style={label}>Password</label>
            <input
              style={input}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12,  }}>
            <button type="button" onClick={onClose} style={{ ...btn, background: "#de0606ff", color: "#fff" }}>
              Cancel
            </button>
            <button type="submit" style={{ ...btn, background: "#257fedff", color: "#fff" }}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Style for Modal
const backdrop = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
};
const modal = { background: "#fff", padding: 16, borderRadius: 10, width: 360, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" };
const row = { display: "flex", flexDirection: "column", gap: 6, marginTop: 8 };
const label = { fontSize: 13, color: "#444" };
const input = { padding: "8px 10px", border: "1px solid #ccc", borderRadius: 8 };
const btn = { padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", cursor: "pointer", background: "#f7f7f7" };
