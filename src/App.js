import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAccount, useNetwork } from "wagmi";

import Header from "./components/Header";
import Trade from "./pages/trade";
import Liquidity from "./pages/liquidity";
import Markets from "./pages/markets";
import Pools from "./pages/pools";

import "./App.css";

function App() {
  const [slipMenu, setSlip] = useState(false);
  const [isactive, setActive] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [timer, setTimer] = useState(null);
  const [selectedChainId, setSelectedChainId] = useState();

  const [needRegist, setNeedRegist] = useState(false);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 999999999 }}
      />
      {needRegist == false && <Header />}
      <Routes>
        <Route
          path="/trade"
          exact
          element={
            <Trade
              walletAddress={address}
              selectedChainId={chain?.id}
              slippageMenu={slipMenu}
              setSlippage={setSlip}
              active={isConnected}
              setOpenModal={setOpenModal}
            />
          }
        />
        <Route
          path="/markets"
          exact
          element={
            <Markets
              selectedChainId={selectedChainId}
              active={isactive}
              setOpenModal={setOpenModal}
            />
          }
        />
        <Route
          path="/pools"
          exact
          element={
            <Pools
              selectedChainId={selectedChainId}
              active={isactive}
              setOpenModal={setOpenModal}
            />
          }
        />
        <Route
          path="/liquidity"
          exact
          element={
            <Liquidity
              selectedChainId={selectedChainId}
              active={isactive}
              setOpenModal={setOpenModal}
            />
          }
        />
        <Route path="*" element={<Navigate replace to="/trade" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
