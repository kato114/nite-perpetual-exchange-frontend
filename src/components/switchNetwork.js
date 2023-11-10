import { useWeb3Modal, Web3NetworkSwitch } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { truncateAddress } from "./utils";
import { isMobile } from "react-device-detect";

export default function SwitchNetwork() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <div className="sc-gmSHEY kfHsPc">
      <li className="sc-VcoSR kndPKb">
        {address ? (
          chains.map((x) => (
            <div
              className="switch-network font-space flex justify-center cursor-pointer w-max"
              style={{
                display: !switchNetwork || x.id === chain?.id ? "none" : "flex",
              }}
              key={x.id}
              onClick={() => switchNetwork?.(x.id)}
            >
              {/* <img src="/assets/image/icon/ic-eth.svg" alt=""/> */}
              {x.id === 97 ? "BSC" : "ETH"}
              {isLoading && pendingChainId === x.id && " (switching)"}
            </div>
          ))
        ) : (
          <div
            className="switch-network font-space flex"
            style={{ cursor: "pointer", whiteSpace: "nowrap", display: "flex" }}
          >
            {isMobile ? "Select" : "Select Network"}
          </div>
        )}
      </li>
    </div>
  );
}
