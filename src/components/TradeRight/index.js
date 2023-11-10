import { useState } from "react";
import { numberFormat } from "../utils";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import TradeOptions from "./TradeOptions";
import "./TradeRight.css";
import classNames from "classnames";

export default function TradeRight({
  bscdecimals,
  handleSwapOptions,
  swapOption,
  handleSwapType,
  swapType,
  handleTokenMenu1,
  handleTokenMenu2,
  setMaxFrom,
  confirmTrade,
  handleSlippage,
  slippage,
  handleOpenPrice,
  openPrice,
  fromAmount,
  handleFromAmount,
  fromSymbol,
  handleToAmount,
  toAmount,
  toSymbol,
  handleSlider,
  slider,
  setOpenModal,
  activeWallet,
  price,
  entryprice,
  pairInterest,
  pairBorrow,
  futureBalace,
  quotePrices,
  changeQuoteType,
  updateBalances,
}) {
  const [anchorOrderTypePopover, setAnchorOrderTypePopover] = useState(null);
  const [longShortSelected, setLongShortSelected] = useState(0);

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

  const handleOrderTypePopoverClick = (event) => {
    setAnchorOrderTypePopover(event.currentTarget);
  };

  const handleOderTypePopoverClose = () => {
    setAnchorOrderTypePopover(null);
  };

  const orderTypePopoverOpen = Boolean(anchorOrderTypePopover);
  const orderTypePopoverId = orderTypePopoverOpen
    ? "order-type-popover"
    : undefined;

  return (
    <div className="sc-yGKTs bymaQa">
      <div className="sc-jpInJi gSyATX">
        <div className={"sc-gyKfoT " + (swapOption == 0 ? "fPjkGO" : "fPjkGP")}>
          <div
            active-color="#0ECB81"
            aria-current="page"
            className={classNames(
              "sc-gvSjmx fmQDUv",
              swapOption === 0 ? "active" : ""
            )}
            onClick={() => handleSwapOptions(0)}
          >
            <label
              fontSize="14"
              className="sc-hAZoDl cdWEUM sc-fEOsli sc-jmQrGM mHzli bSEXLr"
            >
              Buy/Long
            </label>
          </div>
          <div
            active-color="#E43E53"
            className={classNames(
              "sc-gvSjmx jwIEAz",
              swapOption === 1 ? "active" : ""
            )}
            onClick={() => handleSwapOptions(1)}
          >
            <label
              fontSize="14"
              className="sc-hAZoDl cdWEUM sc-fEOsli sc-jmQrGM mHzli bSEXLr"
            >
              Sell/Short
            </label>
          </div>
        </div>
        <div className="sc-hhfWkW cXVuaJ">
          <div className="sc-izEbhJ kqnjtX">
            <div className="sc-jMKfon isCDwY">
              <div>
                <div className="sc-gcFSfr kHeNig">
                  <label
                    fontSize="13"
                    className="sc-hAZoDl bgxyIr sc-fEOsli mHzli"
                  >
                    Order Type
                  </label>
                  <div className="sc-dIouRR dhfupG">
                    <Tooltip
                      title="Market Order: execute the order immediately at current price. Limit order: execute the order when the market trades at a specific price"
                      placement="top"
                      arrow
                      enterTouchDelay={0}
                    >
                      <div className="sc-dmRaPn gsoPia"></div>
                    </Tooltip>
                  </div>
                </div>
                <div className="sc-bAKPPm ffehc">
                  <div
                    className="sc-dGHKFW cRcelP"
                    onClick={handleOrderTypePopoverClick}
                  >
                    <label
                      fontSize="14"
                      className="sc-hAZoDl cdWEUM sc-fEOsli mHzli"
                    >
                      {swapType == 0 ? "Market order" : "Limit Order"}
                    </label>
                    <img
                      src="/assets/image/icon/ic-dropdown.svg"
                      className="sc-jWquRx cwaGZa arrow"
                      alt=""
                    />
                  </div>
                  <Popover
                    id={orderTypePopoverId}
                    open={orderTypePopoverOpen}
                    anchorEl={anchorOrderTypePopover}
                    onClose={handleOderTypePopoverClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <div className="sc-jZiqTT bEERhX sc-PJClH dWVWHG">
                      <label
                        fontSize="16"
                        className={
                          "sc-hAZoDl jWrHsK sc-fEOsli sc-jfdOKL mHzli " +
                          (swapType == 0 ? "cPpoCB" : "ebRjjn")
                        }
                        onClick={(e) => {
                          handleOderTypePopoverClose();
                          handleSwapType(0);
                        }}
                      >
                        Market order
                      </label>
                      <label
                        fontSize="16"
                        className={
                          "sc-hAZoDl jWrHsK sc-fEOsli sc-jfdOKL mHzli " +
                          (swapType == 1 ? "cPpoCB" : "ebRjjn")
                        }
                        onClick={(e) => {
                          handleOderTypePopoverClose();
                          handleSwapType(1);
                        }}
                      >
                        Limit order
                      </label>
                    </div>
                  </Popover>
                </div>
              </div>
              <div className="sc-fUmEdy iGffJI">
                <div className="sc-gcFSfr kHeNig">
                  <label
                    fontSize="13"
                    className="sc-hAZoDl bgxyIr sc-fEOsli mHzli"
                  >
                    Price
                  </label>
                  <div className="sc-dIouRR dhfupG">
                    <Tooltip
                      title="Asset pricing is powered by Chainlink Oracles. It is an aggregate of prices from leading volume exchanges."
                      placement="top"
                      arrow
                      enterTouchDelay={0}
                    >
                      <div className="sc-dmRaPn gsoPia"></div>
                    </Tooltip>
                  </div>
                </div>
                <input
                  autoComplete="off"
                  placeholder={swapType == 0 ? "MARKET PRICE" : "LIMIT PRICE"}
                  type="text"
                  disabled={swapType == 0}
                  className="sc-dSqHuY jDvPZg"
                  value={swapType == 0 ? "" : openPrice}
                  onChange={(e) => handleOpenPrice(e)}
                />
              </div>
            </div>
            <TradeOptions
              fromSymbol={fromSymbol}
              fromAmount={fromAmount}
              handleFromAmount={handleFromAmount}
              toAmount={toAmount}
              handleToAmount={handleToAmount}
              handleSlider={handleSlider}
              slider={slider}
              swapOption={swapOption}
              futureBalace={futureBalace}
              activeWallet={activeWallet}
              slippage={slippage}
              handleSlippage={handleSlippage}
              quotePrices={quotePrices}
              changeQuoteType={changeQuoteType}
              updateBalances={updateBalances}
            />
            {address ? (
              <>
                {swapOption == 0 ? (
                  <button
                    className="sc-fbPSWO sc-fzCEhR cYmVog kDKenN relative"
                    onClick={() => confirmTrade()}
                  >
                    Open a position
                  </button>
                ) : (
                  <button
                    className="sc-fbPSWO sc-fzCEhR cYmVoh kDKenN relative"
                    onClick={() => confirmTrade()}
                  >
                    Open a position
                  </button>
                )}
              </>
            ) : (
              <button
                className="sc-fbPSWO sc-fzCEhR cYmVof kDKenN relative"
                onClick={() => onClick()}
              >
                <>Connect Wallet</>
              </button>
            )}
            <div className="sc-lmHNfd bWgAxR">
              <div className="left">
                <label
                  fontSize="14"
                  color="#b9b9b9"
                  className="sc-hAZoDl enTViw sc-fEOsli mHzli"
                >
                  Collateral Asset
                </label>
              </div>
              <div className="sc-bdxVC kmgYZf">
                <div className="sc-bQRcPC koiqbu">
                  <span>EUSD</span>
                </div>
              </div>
            </div>
            <div className="sc-lmHNfd bWgAxR">
              <div className="left">
                <label
                  fontSize="14"
                  color="#b9b9b9"
                  className="sc-hAZoDl enTViw sc-fEOsli mHzli"
                >
                  Collateral Value
                </label>
              </div>
              <div className="sc-bdxVC kmgYZf">
                <label
                  fontSize="14"
                  color="#fff"
                  className="sc-hAZoDl esuQUd sc-fEOsli mHzli"
                >
                  {numberFormat(fromAmount)}
                </label>
              </div>
            </div>
            <div className="sc-lmHNfd bWgAxR">
              <div className="left">
                <label
                  fontSize="14"
                  color="#b9b9b9"
                  className="sc-hAZoDl enTViw sc-fEOsli mHzli"
                >
                  Leverage
                </label>
              </div>
              <div className="sc-bdxVC kmgYZf">
                <label
                  fontSize="14"
                  color="#fff"
                  className="sc-hAZoDl esuQUd sc-fEOsli mHzli"
                >
                  {slider}
                </label>
              </div>
            </div>
            <div className="sc-lmHNfd bWgAxR">
              <div className="left">
                <label
                  fontSize="14"
                  color="#b9b9b9"
                  className="sc-hAZoDl enTViw sc-fEOsli mHzli"
                >
                  Entry Price
                </label>
              </div>
              <div className="sc-bdxVC kmgYZf">
                <label
                  fontSize="14"
                  color="#fff"
                  className="sc-hAZoDl esuQUd sc-fEOsli mHzli"
                >
                  ${numberFormat(entryprice, bscdecimals)}
                </label>
              </div>
            </div>
            <div className="sc-lmHNfd bWgAxR">
              <div className="left">
                <label
                  fontSize="14"
                  color="#b9b9b9"
                  className="sc-hAZoDl enTViw sc-fEOsli mHzli"
                >
                  Liquidation Price
                </label>
              </div>
              <div className="sc-bdxVC kmgYZf">
                <label
                  fontSize="14"
                  color="#ffb313"
                  className="sc-hAZoDl enXSfk sc-fEOsli mHzli"
                >
                  {swapOption == 0
                    ? ((1 - 1 / Number(slider)) * Number(entryprice)).toFixed(
                        bscdecimals
                      )
                    : ((1 + 1 / Number(slider)) * Number(entryprice)).toFixed(
                        bscdecimals
                      )}
                </label>
              </div>
            </div>
            <div className="sc-bHfcXc efMDpx"></div>
            <label fontSize="16" className="sc-hAZoDl jWrHsK sc-bjUoiL bGiNJV">
              Market Info
            </label>
            <div className="sc-lmHNfd bWgAxR">
              <div className="left">
                <label
                  fontSize="14"
                  color="#b9b9b9"
                  className="sc-hAZoDl enTViw sc-fEOsli mHzli"
                >
                  Borrow Fee
                </label>
              </div>
              <div className="sc-bdxVC kmgYZf">
                <label
                  fontSize="14"
                  color="#fff"
                  className="sc-hAZoDl esuQUd sc-fEOsli mHzli"
                >
                  {pairInterest}% per hour
                </label>
              </div>
            </div>
            <div
              className="sc-lmHNfd bWgAxR"
              style={{ alignItems: "flex-start" }}
            >
              <div className="left">
                <label
                  fontSize="14"
                  color="#b9b9b9"
                  className="sc-hAZoDl enTViw sc-fEOsli mHzli"
                >
                  Available Liquidity
                </label>
              </div>
              <div className="sc-bdxVC kmgYZf">
                <div className="sc-dTbhCw iPRvzb">
                  <label
                    fontSize="14"
                    color="#fff"
                    className="sc-hAZoDl esuQUd sc-fEOsli mHzli"
                  >
                    EUSD
                  </label>
                  <label
                    fontSize="13"
                    color="#adabab"
                    className="sc-hAZoDl iKcrbB sc-fEOsli mHzli"
                  >
                    ${numberFormat(pairBorrow)}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
