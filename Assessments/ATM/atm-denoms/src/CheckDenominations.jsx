import React, { useMemo, useState } from "react";

export default function CheckDenominations() {
  const BILLS = useMemo(() => [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1], []);
  const [amountInput, setAmountInput] = useState("");
  const [result, setResult] = useState(null); 

  function withdraw() {
    const amt = Number(amountInput);
    if (!Number.isFinite(amt) || amt < 0) {
      setResult({ error: "Please enter a non-negative number." });
      return;
    }

    const whole = Math.floor(amt);
    let remaining = whole;
    const breakdown = [];

    for (const d of BILLS) {
      const count = Math.floor(remaining / d);
      breakdown.push({ denom: d, count });
      remaining -= count * d;
    }

    const totalNotes = breakdown.reduce((sum, r) => sum + r.count, 0);
    setResult({ breakdown, totalNotes, amount: whole });
  }

  return (
    <div style={{ maxWidth: 520, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
      <h2>ATM Dispenser — Check Denominations</h2>

      <label style={{ display: "block", marginBottom: 8 }}>
        Amount:
        <input
          type="number"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
          placeholder="Enter amount, e.g. 7863"
          style={{ marginLeft: 8, padding: "6px 10px", width: 200 }}
        />
      </label>

      <button onClick={withdraw} style={{ padding: "8px 14px", cursor: "pointer" }}>
        Withdraw
      </button>

      {result?.error && (
        <p style={{ color: "crimson", marginTop: 12 }}>{result.error}</p>
      )}

      {result && !result.error && (
        <div style={{ marginTop: 16 }}>
          <h3>Breakdown for ${result.amount}</h3>
          <ul style={{ lineHeight: 1.7, paddingLeft: 18 }}>
            {result.breakdown.map((r) => (
              <li key={r.denom}>
                {r.count} notes of $ {r.denom}
              </li>
            ))}
          </ul>
          <strong>Total notes dispensed: {result.totalNotes}</strong>
        </div>
      )}
    </div>
  );
}
