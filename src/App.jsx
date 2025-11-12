import React, { useMemo } from "react";
import useWebSocket from "react-use-websocket";//mamages ws connections
import OrderBook from "./Components/Orderbook";
import SelectorBar from "./Components/Selectorbar";//ui components
import { OrderBookProvider, useOrderBookStore } from "./hooks/OrderBookProvider";//hook for global state

const WS_URL = process.env.REACT_APP_WS_URL;

console.log("WebSocket URL:", process.env.REACT_APP_WS_URL);//websocket url from env variables


//access shared state and setup websocket connection
function InnerApp() {
  const { addPayload, exchanges, coinsByExchange } = useOrderBookStore();

  useWebSocket(WS_URL, {
    onOpen: () => console.log("WS open"),
    onClose: () => console.log("WS closed"),
    onMessage: (ev) => {
      try {
        const payload = JSON.parse(ev.data);//converts incoming message to json
        addPayload(payload);//adds payload data to global state
        console.log("Incoming:", payload);
      } catch (err) {
        console.error("Invalid WS message:", err);
      }
    },
    shouldReconnect: () => true,//establishes reconnection on disconnection
  });

  const exchangeOptions = useMemo(() => Array.from(exchanges), [exchanges]);//renders when exchanges change

  //renders selector bar and order book
  return (
    <div style={{ padding: 20, fontFamily: "Inter, Arial, sans-serif", maxWidth: 1000, margin: "0 auto" }}>
      <h1>Live Order Book</h1>
      

      <SelectorBar coinsByExchange={coinsByExchange} />

      <div style={{ marginTop: 20 }}>
        <OrderBook />
      </div>

      <footer style={{ marginTop: 24, color: "#888" }}>
        
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <OrderBookProvider>
      <InnerApp />
    </OrderBookProvider>
  );
}
