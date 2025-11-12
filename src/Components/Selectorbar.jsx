import React, { useEffect } from "react";
import { useOrderBookStore } from "../hooks/OrderBookProvider";

export default function SelectorBar({ coinsByExchange }) {
  const { state, setSelected } = useOrderBookStore();//holds current selection and data
  
//gets list of exchanges and first coin for initial selection
  const exchanges = Object.keys(coinsByExchange || {});
  const firstExchange = exchanges[0];
  const firstCoin = firstExchange ? coinsByExchange[firstExchange][0] : null;

  // Set initial selection on first render
  useEffect(() => {
    if (firstExchange && firstCoin) {
      setSelected({ exchange: firstExchange, coin: firstCoin });
    }
  }, [firstExchange, firstCoin, setSelected]);

  // Show placeholder if no exchanges loaded yet
  if (!exchanges.length) {
    return (
      <div
        style={{
          padding: 12,
          border: "1px dashed #ddd",
          borderRadius: 8,
          textAlign: "center",
          color: "#888",
          fontStyle: "italic",
        }}
      >
        Waiting for available coins / exchanges from the stream...
      </div>
    );
  }
//styles for the select dropdowns
  const selectStyle = {
    marginLeft: 8,
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    fontSize: 14,
    cursor: "pointer",
    background: "#fff",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        flexWrap: "wrap",
        padding: "8px 0",
      }}
    >
      <label style={{ fontWeight: 500 }}>
        Exchange:
        <select
          value={state.selected.exchange || firstExchange}
          onChange={(e) => {
            const newExchange = e.target.value;
            const newCoin = coinsByExchange[newExchange][0];
            setSelected({ exchange: newExchange, coin: newCoin });
          }}
          style={selectStyle}
        >
          {exchanges.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>
      </label>

      <label style={{ fontWeight: 500 }}>
        Coin:
        <select
          value={state.selected.coin || firstCoin}
          onChange={(e) =>
            setSelected({
              exchange: state.selected.exchange,
              coin: e.target.value,
            })
          }
          style={selectStyle}
        >
          {coinsByExchange[state.selected.exchange || firstExchange].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
