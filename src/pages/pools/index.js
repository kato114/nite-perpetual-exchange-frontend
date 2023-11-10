import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

import "./pools.css";

import icon_warst from "../../assets/img/warst.png";
import icon_union from "../../assets/img/union.png";
import icon_black_down from "../../assets/img/black-down.png";

const trimAddress = (addr) => {
  return `${addr.substring(0, 6)}...${addr.substring(39)}`;
};

export default function Pools() {
  const { isConnected } = useAccount();

  let pools = [
    {
      address: "0x278dC748edA1d8eFEf1aDFB518542612b49Fcd34",
      token1: "EMOTI",
      token2: "ETH",
      token1Logo:
        "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1696503332",
      token2Logo:
        "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
      amount: "1.2",
      endTime: "Wed 24 Apr 2024",
      period: "6",
    },
  ];

  return (
    <div className="wholediv pools">
      <div className="flex justify-between items-center mt-10">
        <div className="titleBlank">Pools</div>
        <Link to="/liquidity">
          <button>+ Add liquidity</button>
        </Link>
      </div>
      {!isConnected ? (
        <div className="connect-panel flex flex-col justify-center items-center gap-7">
          <img src={icon_warst} alt="warst" />
          <span>Your active liquidity positions will appear here.</span>
          <button className="px-6 md:px-16 py-2">Connect Wallet</button>
        </div>
      ) : (
        <div className="list-panel px-3 py-5 md:p-5">
          <p>Edit / Withdraw</p>
          {pools.map((pool, key) => {
            return (
              <div key={key} className="pool-panel">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <img src={pool.token1Logo} width="32px" />
                      <img src={pool.token2Logo} width="32px" />
                    </div>
                    <span className="pool-name">
                      {pool.token1} / {pool.token2}
                    </span>
                  </div>
                  <p>{trimAddress(pool.address)}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                  <span className="pool-amount">
                    {pool.amount} {pool.token1} LOCKED
                  </span>
                  <button className="btn-calendar flex justify-between items-center">
                    <img src={icon_union} />
                    <img src={icon_black_down} />
                  </button>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                  <div>
                    <p className="text-center md:text-left pool-date-endtime">
                      {pool.endTime}
                    </p>
                    <p className="text-center md:text-left pool-date-period">
                      in {pool.period} months
                    </p>
                  </div>
                  <Link to="/liquidity?type=withdraw">
                    <button>Withdraw LP</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
