import { useRef, useState, useEffect } from "react";

export default function ConservativeDemo() {
  const [n, setN] = useState(0);
  const renders = useRef(0);

  // count how many times the component rendered
  renders.current += 1;

  // log when the committed DOM text actually changes
  useEffect(() => {
    // This effect runs after React commits the minimal DOM change (the text).
    console.log("[ConservativeDemo] committed: <p> text →", n);
  }, [n]);

  return (
    <section className="card">
      <h2>Conservative Updates</h2>
      <p>Value: {n}</p>
      <button onClick={() => setN(n + 1)}>+1</button>
      <div className="muted">Renders so far: {renders.current}</div>
    
    </section>
  );
}
