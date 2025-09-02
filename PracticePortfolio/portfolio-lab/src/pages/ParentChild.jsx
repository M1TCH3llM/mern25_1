import { useMemo, useRef, useState } from "react";

/** Little UI helper */
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

/** A simple class we’ll pass down as a prop */
class Person {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
  fullName() {
    return `${this.first} ${this.last}`;
  }
}

/** Child 1: receives primitives only */
function ChildPrimitives({ title, year, featured }) {
  const renders = useRenderCount();
  return (
    <div>
      <p>
        <strong>title:</strong> {title}
      </p>
      <p>
        <strong>year:</strong> {year}
      </p>
      <p>
        <strong>featured:</strong> {String(featured)}
      </p>
      <small style={{ opacity: 0.7 }}>renders: {renders}</small>
    </div>
  );
}

/** Child 2: receives an object */
function ChildObject({ project }) {
  const renders = useRenderCount();
  return (
    <div>
      <pre
        style={{
          background: "rgba(0,0,0,.06)",
          padding: 12,
          borderRadius: 8,
          overflowX: "auto",
        }}
      >
        {JSON.stringify(project, null, 2)}
      </pre>
      <small style={{ opacity: 0.7 }}>renders: {renders}</small>
    </div>
  );
}

/** Child 3: receives a class instance (with methods) */
function ChildClass({ owner }) {
  const renders = useRenderCount();
  return (
    <div>
      <p>
        <strong>Owner full name:</strong> {owner.fullName()}
      </p>
      <p>
        <strong>Raw instance:</strong>{" "}
        <code>{JSON.stringify({ first: owner.first, last: owner.last })}</code>
      </p>
      <small style={{ opacity: 0.7 }}>renders: {renders}</small>
    </div>
  );
}

/** Anti-pattern demo: attempting to mutate props inside a child */
function ChildDontMutate({ project }) {
  const [attempted, setAttempted] = useState(false);

  function tryMutate() {
    // ❌ Don’t do this: mutating props can cause bugs and stale UIs.
    // project.stars++  // <- bad
    // ✅ Do this instead: create a copy and ask the parent to update (we’ll do that in Step 5).
    setAttempted(true);
  }

  return (
    <div>
      <p>
        <strong>Incoming stars:</strong> {project.stars}
      </p>
      <button onClick={tryMutate}>Try to mutate props (demo)</button>
      {attempted && (
        <p style={{ marginTop: 8 }}>
          ❗️Props are <em>read-only</em> in children. We’ll learn to update via
          a callback in the next step.
        </p>
      )}
    </div>
  );
}

/** util: track how many times a component rendered */
function useRenderCount() {
  const c = useRef(0);
  c.current += 1;
  return c.current;
}

export default function ParentChild() {
  // Parent state (pretend this is your portfolio data)
  const [featured, setFeatured] = useState(true);
  const [year, setYear] = useState(2025);
  const [color, setColor] = useState("indigo");

  // Object prop — useMemo to keep a stable reference unless deps change
  const project = useMemo(
    () => ({
      id: 1,
      title: "React Portfolio Lab",
      tags: ["react", "router", "patterns"],
      color, // reflects parent state
      stars: 42,
    }),
    [color]
  );

  // Class instance prop — memoize so it doesn’t rebuild every render
  const owner = useMemo(() => new Person("Mitchell", "Morgan"), []);

  return (
    <div>
      <h2>Parent ↔ Child (Props)</h2>
      <p style={{ marginTop: -6 }}>
        The parent owns the data and passes it down as props. Children display
        or derive UI from those props. Props are read-only in children.
      </p>

      {/* Controls that change what we pass down */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          margin: "12px 0 20px",
        }}
      >
        <button onClick={() => setFeatured((f) => !f)}>
          Toggle featured ({String(featured)})
        </button>
        <button onClick={() => setYear((y) => y + 1)}>Year +1 ({year})</button>
        <button
          onClick={() =>
            setColor((c) => (c === "indigo" ? "emerald" : "indigo"))
          }
        >
          Swap color ({color})
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          alignItems: "start",
        }}
      >
        <Card title="Child with primitives (string/number/boolean)">
          <ChildPrimitives
            title="My Favorite Project"
            year={year}
            featured={featured}
          />
        </Card>

        <Card title="Child with an object (nested data)">
          <ChildObject project={project} />
        </Card>

        <Card title="Child with a class instance (methods available)">
          <ChildClass owner={owner} />
        </Card>

        <Card title="❌ Don’t mutate props in children">
          <ChildDontMutate project={project} />
        </Card>
      </div>

      {/* <details style={{ marginTop: 16 }}>
        <summary><strong>Key takeaways</strong></summary>
        <ul>
          <li>
            Props flow one-way: <strong>parent → child</strong>. Children should
            treat props as <em>immutable</em>.
          </li>
          <li>
            Use <code>useMemo</code> to keep object/class references stable
            across renders when appropriate.
          </li>
          <li>
            To update parent-owned data, pass a <strong>callback</strong> from
            the parent and call it in the child (that’s next).
          </li>
        </ul> 
      </details> */}
    </div>
  );
}
