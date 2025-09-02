import { createRoot } from "react-dom/client";
import "./app.css";
import ConservativeDemo from "./components/ConservativeDemo.jsx";
import Success from "./components/Success.jsx"

function App() {
  return (
    <main className="container">
      <h1>React + Webpack (Step 6)</h1>
      <p>If you can see this, we’re good.</p>

      <ConservativeDemo />
      <Success />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
