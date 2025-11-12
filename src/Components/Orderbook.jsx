import React, { useMemo } from "react";
import { useOrderBookStore } from "../hooks/OrderBookProvider";

//formatting price and amount to 4 decimal places
function formatPrice(p) {
  return Number(p).toFixed(4);
}
function formatAmount(a) {
  return Number(a).toFixed(4);
}


export default function OrderBook() {
  //grabs latest data from global state
  const { state } = useOrderBookStore();
  const payload = state.currentPayload;

  const bids = useMemo(() => {
    if (!payload?.bids) return [];//takes the bids from the data
    const arr = payload.bids.map(([price, amount]) => ({//maps them to objects
      price: Number(price),
      amount: Number(amount),
    }));
    return arr.sort((a, b) => b.price - a.price).slice(0, 5);
  }, [payload]);//sorts bids in descending order and takes top 5

  const asks = useMemo(() => {
    if (!payload?.asks) return [];//takes the asks from the data
    const arr = payload.asks.map(([price, amount]) => ({//maps them to objects
      price: Number(price),
      amount: Number(amount),
    }));
    return arr.sort((a, b) => a.price - b.price).slice(0, 5);
  }, [payload]);//sorts asks in ascending order and takes top 5 

  //identifies the best bid and ask
  const bestBid = bids[0] || null;
  const bestAsk = asks[0] || null;

  //shows message if no data available
  if (!payload) {
    return (
      <div
        style={{
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
          textAlign: "center",
          color: "#888",
          fontStyle: "italic",
        }}
      >
        No data for the selected pair yet.
      </div>
    );
  }
//renders the order book with bids and asks
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 300,
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ marginBottom: 12, fontSize: 18, fontWeight: 600 }}>
          {payload.exchange} — {payload.coin}
        </h3>

        <div style={{ display: "flex", gap: 12 }}>
          {/* Asks */}
          <div style={{ flex: 1 }}>
            <h4 style={{ marginBottom: 6, color: "#c53030" }}>Asks (sell)</h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "right", color: "#666", fontSize: 12 }}>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {asks.map((a, i) => (
                  <tr
                    key={i}
                    style={{
                      background:
                        bestAsk && a.price === bestAsk.price
                          ? "#ffecec"
                          : "transparent",
                    }}
                  >
                    <td style={{ padding: "4px 8px" }}>{formatPrice(a.price)}</td>
                    <td style={{ padding: "4px 8px" }}>{formatAmount(a.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bids */}
          <div style={{ flex: 1 }}>
            <h4 style={{ marginBottom: 6, color: "#2f855a" }}>Bids (buy)</h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "right", color: "#666", fontSize: 12 }}>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((b, i) => (
                  <tr
                    key={i}
                    style={{
                      background:
                        bestBid && b.price === bestBid.price
                          ? "#ecffe8"
                          : "transparent",
                    }}
                  >
                    <td style={{ padding: "4px 8px" }}>{formatPrice(b.price)}</td>
                    <td style={{ padding: "4px 8px" }}>{formatAmount(b.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 12, color: "#666", fontSize: 12 }}>
          Last update:{" "}
          {payload?.timestamp
            ? new Date(payload.timestamp * 1000).toLocaleTimeString()
            : "—"}
        </div>
      </div>
    </div>
  );
}
