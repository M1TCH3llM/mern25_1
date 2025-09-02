import { useRef, useState } from "react";

/**
 * Small presentational card
 */
function Card({ title, children }) {
  return (
    <section
      style={{
        flex: 1,
        minWidth: 320,
        border: "1px solid rgba(0,0,0,.1)",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 6px 16px rgba(0,0,0,.06)",
        background: "rgba(255,255,255,.6)",
        backdropFilter: "blur(6px)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

/**
 * Controlled form — every field is bound to React state
 */
function ControlledForm() {
  // Single state object for the whole form
  const [form, setForm] = useState({ // initial state 
    name: "",
    email: "", 
    phone: "",
    newsletter: false, // checkbox
  });

  const [submitted, setSubmitted] = useState(null); // submitted data

  function update(e) {
    const { name, type, checked, value } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function onSubmit(e) {
    e.preventDefault(); // prevent page reload
    // “form” already has the current values
    setSubmitted(form);
  }

  const isValid =
    form.name.trim().length >= 2 && // at least 2 chars
    /\S+@\S+\.\S+/.test(form.email); // simple email regex

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={{ display: "grid", gap: 10 }}>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Jeff Jefferson"
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Email
            <input
              name="email"
              value={form.email}
              onChange={update}
              placeholder="jef@example.com"
              style={{ width: "100%" }}
              type="email"
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={update}
              placeholder="800-867-5309"
              style={{ width: "100%" }}
              type="phone"
            />
          </label>

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              name="newsletter"
              type="checkbox"
              checked={form.newsletter}
              onChange={update}
            />
            Subscribe to newsletter
          </label>

          <button disabled={!isValid} type="submit">
            Submit (Controlled)
          </button>
        </div>
      </form>

      <div style={{ marginTop: 12, fontSize: 14, opacity: 0.9 }}>
        <strong>Live state:</strong>{" "}
        
        <code>{JSON.stringify(form)}</code>
      </div>

      {submitted && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: "rgba(0,128,0,0.08)",
            border: "1px solid rgba(0,128,0,0.25)",
            borderRadius: 8,
          }}
        >
          <strong>Submitted (controlled):</strong>{" "}
          <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </div>
  );
}

/**
 * Uncontrolled form — the DOM holds values; we read via refs.
 * Useful for simple forms, file inputs, or when you don’t need every keystroke.
 */
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const newsRef = useRef(null);
  const fileRef = useRef(null);

  const [submitted, setSubmitted] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      phone: phoneRef.current?.value ?? "",
      newsletter: !!newsRef.current?.checked,
      fileName: fileRef.current?.files?.[0]?.name ?? null,
    };
    setSubmitted(data);
    // Optional: reset DOM inputs directly
    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={{ display: "grid", gap: 10 }}>
          <label>
            Name
            <input
              // defaultValue sets the initial DOM value; not connected to React state
              defaultValue="Grace Hopper"
              ref={nameRef}
              placeholder="Name"
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Email
            <input
              defaultValue="grace@example.com"
              ref={emailRef}
              placeholder="Email"
              style={{ width: "100%" }}
              type="email"
            />
          </label>

          <label>
            Phone
            <input
              defaultValue="800-867-5309"
              ref={phoneRef}
              placeholder="Phone"
              style={{ width: "100%" }}
              type="phone"
            />
          </label>


          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input defaultChecked ref={newsRef} type="checkbox" />
            Subscribe to newsletter
          </label>

          <label>
            Upload avatar (file inputs are typically uncontrolled)
            <input ref={fileRef} type="file" accept="image/*" />
          </label>

          <button type="submit">Submit (Uncontrolled)</button>
        </div>
      </form>

      {submitted && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: "rgba(0,0,255,0.08)",
            border: "1px solid rgba(0,0,255,0.25)",
            borderRadius: 8,
          }}
        >
          <strong>Submitted (uncontrolled):</strong>{" "}
          <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </div>
  );
}

export default function ControlledUncontrolled() {
  return (
    <div>
      <h2>Controlled vs Uncontrolled</h2>
      <p style={{ marginTop: -6 }}>
        Same UI, two data-flow styles. Controlled binds inputs to React state;
        Uncontrolled lets the DOM keep the values and reads them via <code>ref</code>.
      </p>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          alignItems: "start",
        }}
      >
        <Card title="Controlled Form">
          <ControlledForm />
        </Card>
        <Card title="Uncontrolled Form">
          <UncontrolledForm />
        </Card>
      </div>

      {/* <details style={{ marginTop: 16 }}>
        <summary><strong>Key takeaways</strong></summary>
        <ul>
          <li>
            <strong>Controlled:</strong> use when you need instant validation, conditional UI,
            or to sync values elsewhere. Tradeoff: more renders.
          </li>
          <li>
            <strong>Uncontrolled:</strong> quick to wire, great for simple forms and file inputs.
            Tradeoff: you read values at submit time (via <code>ref</code>), not at every keystroke.
          </li>
        </ul>
      </details> */}
    </div>
  );
}
