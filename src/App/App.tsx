import React from "react";

import CoinPage from "./pages/CoinPage";
import CoinsList from "./pages/CoinsList";
import CoinsStore from "store/CoinsStore/CoinsStore";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.module.scss";

export const coinsStore = new CoinsStore();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinsList coinsStore={coinsStore} />} />
        <Route
          path="/coin/:id"
          element={<CoinPage coinsStore={coinsStore} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
