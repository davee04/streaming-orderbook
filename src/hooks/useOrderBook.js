import { useState, useCallback } from "react";


export default function useOrderBook() {
  
  const [map, setMap] = useState({}); //stores payloads by exchange:coin key 
  const [selected, setSelected] = useState({ exchange: null, coin: null });//tracks selected exchange and coin

  const addPayload = useCallback((payload) => {
    if (!payload || !payload.exchange || !payload.coin) return;//check to see if data includes exchange and coin

    const key = `${payload.exchange}:${payload.coin}`;//builds key
    setMap((m) => {
      const copy = { ...m, [key]: payload };
      // If nothing selected yet, pick the first arriving pair
      if (!selected.exchange && !selected.coin) {
        setSelected({ exchange: payload.exchange, coin: payload.coin });
      }
      return copy;
    });
  }, [selected]);

  // unique exchanges and coins list
  const exchanges = new Set();
  const coinsByExchange = {};
  Object.values(map).forEach((p) => {
    exchanges.add(p.exchange);
    coinsByExchange[p.exchange] = coinsByExchange[p.exchange] || new Set();
    coinsByExchange[p.exchange].add(p.coin);
  });

  // convert sets to arrays for usage
  const coinsByExchangeArray = {};
  for (const k of Object.keys(coinsByExchange)) {
    coinsByExchangeArray[k] = Array.from(coinsByExchange[k]);
  }

  //buils a key for the selected exchange and coin
const key =
  selected.exchange && selected.coin ? `${selected.exchange}:${selected.coin}` : null;

// fallback to first available payload if selected one not found
const currentPayload =
  key && map[key] ? map[key] : Object.values(map)[0] || null;

const state = {
  map,
  selected,
  currentPayload,
};


  return {
    addPayload,
    exchanges,
    coinsByExchange: coinsByExchangeArray,
    selected,
    setSelected,
    state,
  };
}
