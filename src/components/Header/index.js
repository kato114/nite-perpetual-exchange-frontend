import "./Header.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import WalletConnect from "../../components/walletConnect";
import SwitchNetwork from "../../components/switchNetwork";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default function Header() {
  const [transX, setTransX] = useState("-100vw");

  return (
    <div>
      <header className="sc-hGtivm jxdDlm">
        <div className="flex items-center gap-2">
          <img
            src="/assets/image/header/ic-bar.svg"
            className="flex md:hidden cursor-pointer"
            onClick={() => setTransX("0")}
          />
          <a className="sc-coCPJf sc-bcnBk iukDEk gBRRhD" href="/trade">
            <img
              src="/assets/image/header/logo.svg"
              className="sc-fYHEnZ gQXqYZ"
              alt=""
            />
          </a>
        </div>
        <ul
          className="sidebar flex md:hidden"
          style={{ transform: `translateX(${transX})` }}
        >
          <li className="sc-VcoSR sc-glUVip kndPKb kKzpOQ">
            <a className="sc-coCPJf iukDEk" href="/">
              <img
                src="/assets/image/header/logo.svg"
                className="sc-fYHEnZ gQXqYZ"
                alt=""
              />
            </a>
            <div
              className="sc-goMRkL kbKCDD close cursor-pointer"
              onClick={() => setTransX("-100vw")}
            >
              <img
                src="/assets/image/header/ic-x.svg"
                className="sc-jNrqiC bwCsQT"
                alt=""
              />
            </div>
          </li>
          <li>
            <Link to="/markets" onClick={(e) => setTransX("-100vw")}>
              Markets
            </Link>
          </li>
          <li>
            <Link to="/trade" onClick={(e) => setTransX("-100vw")}>
              Trade
            </Link>
          </li>
          <li>
            <Link to="/pools" onClick={(e) => setTransX("-100vw")}>
              Pools
            </Link>
          </li>
        </ul>
        <ul className="hidden md:flex gap-16 lg:gap-32">
          <li>
            <Link to="/markets">Markets</Link>
          </li>
          <li>
            <Link to="/trade">Trade</Link>
          </li>
          <li>
            <Link to="/pools">Pools</Link>
          </li>
        </ul>
        <ul className="font-space">
          {/* <SwitchNetwork /> */}
          <WalletConnect />
        </ul>
      </header>
    </div>
  );
}
