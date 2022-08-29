import React from "react";

import CoinsStore from "@store/CoinsStore/CoinsStore";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.module.scss";

import CoinPage from "./pages/CoinPage";
import CoinsList from "./pages/CoinsList";

export const coinStore = new CoinsStore();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinsList />} />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
