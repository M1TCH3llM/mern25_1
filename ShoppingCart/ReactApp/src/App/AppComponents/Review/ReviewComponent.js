import React, { useEffect, useMemo, useState } from "react";

/**
 * ReviewComponent
 * Read-only feed of product reviews across all users.
 * Each card shows: Product Name, Stars, Comment, Author, When.
 */

const API_ORIGIN =
  (typeof window !== "undefined" && window.API_ORIGIN) || "http://localhost:9000";

export default function ReviewComponent() {
  const [loading, setLoading] = useState(true);
  const [errs, setErrs] = useState(null);
  const [rows, setRows] = useState([]); // flattened product reviews
  const [productNames, setProductNames] = useState({}); // { productId: name }

  // 1) Load ALL reviews (public)
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErrs(null);

    (async () => {
      try {
        const res = await fetch(`${API_ORIGIN}/review/all`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Expecting: { reviews: [ { userId, author:{userName}, orderId, products:[{productId,name?,rating,comment}], createdAt } ] }
        const flat = [];
        const nameSeed = {};

        for (const doc of data?.reviews || []) {
          const userName = doc?.author?.userName || "Unknown";
          const when = doc?.createdAt ? new Date(doc.createdAt) : null;

          for (const p of doc.products || []) {
            const pid = String(p.productId || "");
            if (!pid) continue;

            // Pre-seed any provided product names from the review doc
            if (p.name && !nameSeed[pid]) {
              nameSeed[pid] = p.name;
            }

            flat.push({
              key: `${doc.userId}-${doc.orderId}-${pid}`, // stable key
              productId: pid,
              // displayName from doc (will be overridden later if we resolve a better one)
              displayName: p.name || null,
              rating: clamp(p.rating, 0, 5),
              comment: String(p.comment || ""),
              author: userName,
              createdAt: when,
            });
          }
        }

        if (!alive) return;
        setRows(flat);
        // Seed known product names immediately
        if (Object.keys(nameSeed).length) {
          setProductNames((prev) => ({ ...nameSeed, ...prev }));
        }
      } catch (e) {
        if (!alive) return;
        setErrs(e.message || "Failed to load reviews");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // 2) Determine which productIds still need names
  const idsNeedingNames = useMemo(() => {
    const need = new Set();
    for (const r of rows) {
      if (!r.productId) continue;
      // If row has no displayName AND we haven't resolved it globally, queue it
      if (!r.displayName && !productNames[r.productId]) {
        need.add(r.productId);
      }
    }
    return Array.from(need);
  }, [rows, productNames]);

  // 3) Resolve missing names from product API (with fallback + no infinite loop)
  useEffect(() => {
    let alive = true;
    if (!idsNeedingNames.length) return;

    (async () => {
      const next = {};
      await Promise.all(
        idsNeedingNames.map(async (pid) => {
          try {
            const res = await fetch(
              `${API_ORIGIN}/product/api/products/${encodeURIComponent(pid)}`
            );
            if (!res.ok) {
              // mark as resolved with fallback to avoid endless retries
              next[pid] = `Product ${String(pid).slice(-6)}`;
              return;
            }
            const p = await res.json();
            next[pid] =
              p?.productName || p?.name || p?.title || `Product ${String(pid).slice(-6)}`;
          } catch {
            next[pid] = `Product ${String(pid).slice(-6)}`;
          }
        })
      );
      if (alive && Object.keys(next).length) {
        setProductNames((prev) => ({ ...prev, ...next }));
      }
    })();

    return () => {
      alive = false;
    };
  }, [idsNeedingNames]);

  // 4) Final list with resolved names
  const cards = useMemo(() => {
    return rows.map((r) => {
      const productName =
        r.displayName || productNames[r.productId] || `Product ${String(r.productId).slice(-6)}`;
      return { ...r, productName };
    });
  }, [rows, productNames]);

  return (
    <section style={pageBox}>
      <h2 style={{ marginTop: 0 }}>All Reviews</h2>

      {loading && <div>Loading…</div>}
      {errs && (
        <div style={{ color: "crimson", marginBottom: 12 }}>
          {errs}
        </div>
      )}

      {!loading && !errs && cards.length === 0 && (
        <em>No reviews yet.</em>
      )}

      <div style={cardsGrid}>
        {cards.map((c) => (
          <article key={c.key} style={cardBox}>
            <header style={cardHeader}>
              <div style={{ fontWeight: 700 }}>{c.productName}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                {c.createdAt ? formatWhen(c.createdAt) : "—"}
              </div>
            </header>

            <div style={{ margin: "4px 0 8px" }}>
              <Stars value={c.rating} />
            </div>

            {c.comment ? (
              <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{c.comment}</p>
            ) : (
              <p style={{ margin: 0, opacity: 0.7 }}><em>No comment provided.</em></p>
            )}

            <footer style={cardFooter}>
              <span style={{ opacity: 0.8 }}>by</span>&nbsp;
              <strong>{c.author}</strong>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Helpers & tiny UI bits ---------- */

function Stars({ value = 0 }) {
  const v = clamp(value, 0, 5);
  return (
    <div style={{ display: "inline-flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} aria-hidden="true" style={{ opacity: n <= v ? 1 : 0.35 }}>
          ★
        </span>
      ))}
      <span style={{ fontSize: 12, opacity: 0.6, marginLeft: 6 }}>
        {Number(v).toFixed(1)}
      </span>
    </div>
  );
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, Number(n) || 0));
}

function formatWhen(d) {
  try {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toLocaleString();
  } catch {
    return "—";
  }
}

/* ---------- Inline styles (match your app.css vibe) ---------- */

const pageBox = {
  maxWidth: 1000,
  margin: "20px auto",
  padding: 16,
};

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 12,
  marginTop: 12,
};

const cardBox = {
  border: "1px solid #333",
  borderRadius: 12,
  background: "#ffffffd8",
  color: "#000",
  padding: 12,
  boxShadow: "0 12px 24px rgba(0,0,0,.12)",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  marginBottom: 6,
};

const cardFooter = {
  marginTop: 10,
  fontSize: 13,
  borderTop: "1px dashed #ccc",
  paddingTop: 6,
};
