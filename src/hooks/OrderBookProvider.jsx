import React, { createContext, useContext } from "react";
import useOrderBook from "./useOrderBook";

const OrderBookContext = createContext(null);//creates context for global state

export function OrderBookProvider({ children }) {
  const store = useOrderBook();//stores live data from useOrderBook hook
  return (
    //wraps the app with context provider so any component can access the global state
    <OrderBookContext.Provider value={store}>
      {children}
    </OrderBookContext.Provider>
  );
}

//creates hook to access the global state and checks if used within provider
export function useOrderBookStore() {
  const ctx = useContext(OrderBookContext);
  if (!ctx) throw new Error("useOrderBookStore must be used within OrderBookProvider");
  return ctx;
}
