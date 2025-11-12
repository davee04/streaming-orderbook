# Getting Started orderbook app

## 1 clone repository

git clone https://github.com/davee04/streaming-orderbook.git
cd streaming-orderbook

## 2 install dependencies

yarn install

## 3 create an env file

REACT_APP_WS_URL=wss://fastapi-orderbook-478451602993.europe-west1.run.app/ws/orderbook

## 4 start development server

yarn start

## Tech Stack

React (Create React App)
React Hooks – useState, useEffect, useMemo, useCallback
Context API for global state management
react-use-websocket – handles real-time WebSocket connections
JavaScript / JSX

## Assumptions

The WebSocket endpoint provides live JSON data containing:
timestamp
exchange
coin
bids/asks

Each update replaces the previous snapshot for that coin and exchange.
Only the top 5 levels of bids and asks are displayed for clarity.
OrderBookProvider is used to share live data between components globally.
