import React, { useMemo, useState, useEffect } from "react";

export default function NotificationBell({
  staticItems = [],
  dynamicItems = [],
  onOpenItem,
}) {
  const seed = useMemo(() => {
    const tag = (arr, type) => arr.map(x => ({ ...x, type, read: false }));
    return [...tag(staticItems, "static"), ...tag(dynamicItems, "dynamic")];
    // eslint-disable-next-line
  }, []);

  const [isOpen, setOpen] = useState(false);
  const [items, setItems] = useState(seed);

  // Merge new props, preserve read flags
  useEffect(() => {
    setItems(prev => {
      const prevRead = new Map(prev.map(i => [i.id, i.read]));
      const tag = (arr, type) =>
        arr.map(x => ({ ...x, type, read: prevRead.get(x.id) ?? false }));

      const next = [...tag(staticItems, "static"), ...tag(dynamicItems, "dynamic")];
      if (arrayShallowEqual(prev, next)) return prev;
      return next;
    });
  }, [staticItems, dynamicItems]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const unreadCount = items.reduce((n, i) => n + (i.read ? 0 : 1), 0);
  const staticList = items.filter(i => i.type === "static");
  const dynamicList = items.filter(i => i.type === "dynamic");

  const handleOpenItem = (item) => {
    setItems(prev => prev.map(i => (i.id === item.id ? { ...i, read: true } : i)));
    onOpenItem && onOpenItem(item);
  };

  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, read: true })));

  return (
    <>
      {/* Bell trigger (styled via app.css) */}
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={isOpen}
        onClick={() => setOpen(true)}
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span aria-label={`${unreadCount} unread notifications`}>{unreadCount}</span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="notif-backdrop" onClick={() => setOpen(false)}>
          <div
            className="notif-modal"
            role="dialog"
            aria-label="Notifications panel"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()} // stop backdrop click
          >
            <div className="notif-modal-header">
              <strong>Notifications</strong>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={markAllRead}>Mark all read</button>
                <button type="button" onClick={() => setOpen(false)}>Close</button>
              </div>
            </div>

            {items.length === 0 && (
              <div className="notif-empty">You’re all caught up.</div>
            )}

            {staticList.length > 0 && (
              <Section title="Help" items={staticList} onOpenItem={handleOpenItem} />
            )}

            {dynamicList.length > 0 && (
              <Section title="Recent Updates" items={dynamicList} onOpenItem={handleOpenItem} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Section({ title, items, onOpenItem }) {
  return (
    <div className="notif-section">
      <div className="notif-section-title">{title}</div>
      <ul className="notif-list">
        {items.map(item => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onOpenItem(item)}
              className={`notif-item ${item.read ? "" : "unread"}`}
            >
              {!item.read ? <Dot /> : <span style={{ width: 8 }} />}
              <span className="notif-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 005 15h14a1 1 0 00.707-1.707L18 11.586V8a6 6 0 00-6-6zm0 20a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
  );
}

function Dot() {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        background: "#0d6efd",
        display: "inline-block",
        flex: "0 0 8px",
      }}
    />
  );
}

function arrayShallowEqual(a, b) {
  if (a === b) return true;
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i];
    if (x.id !== y.id || x.type !== y.type || x.label !== y.label || x.href !== y.href || !!x.read !== !!y.read) {
      return false;
    }
  }
  return true;
}
