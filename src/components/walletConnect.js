import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { truncateAddress } from "./utils";
import { isMobile } from "react-device-detect";

export default function WalletConnect() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  async function onOpen() {
    await open();
  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  return (
    <div className="sc-gmSHEY kfHsPc">
      <li className="sc-VcoSR kndPKb" onClick={onClick}>
        {address ? (
          <div className="bg-white rounded-[5px] flex px-6 py-[10px] items-center justify-center w-max gap-1 text-[#0C0C12] text-[14px] font-[700] cursor-pointer">
            {!isMobile && (
              <img src="/assets/image/icon/ic-metamask.svg" alt="" />
            )}
            {truncateAddress(address, isMobile)}
          </div>
        ) : (
          <div
            className="connect-wallet font-space flex"
            style={{ cursor: "pointer", whiteSpace: "nowrap", display: "flex" }}
          >
            {isMobile ? "Connect" : "Connect Wallet"}
            {/* {!isMobile && <span className="text-[24px] leading-5 -mr-4">💳</span>} */}
          </div>
        )}
      </li>
    </div>
  );
}
