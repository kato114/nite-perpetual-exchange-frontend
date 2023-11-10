import * as ethers from "ethers";
import {
  numberFormat,
  getBigNumber,
  timeConverter,
  truncateAddress,
} from "../../components/utils";
import { tokenMenu2 } from "../../components/tokens";
import { useState, useRef, useEffect } from "react";
import Web3 from "web3";
import {
  chainData,
  TOKENCONVERTOR,
  TIDEPOSITION_ADDRESS,
  ZEROLAYER_ENDPOINT_LIST,
  ZEROLAYER_CHAINID_LIST,
  BSCRPCURL,
  TRADING_ADDRESS_LIST,
  MAX_TRADES_PER_PAIR,
  STORAGE_ADDRESS,
  LIMIT_ADDRESS_LIST,
  USDT_PRECISION,
} from "../../components/tradeUI.js";
import { STORAGE_ABI } from "../../abi/STORAGE";
import { TRADING_ABI } from "../../abi/TRADING";
import { LIMIT_ABI } from "../../abi/LIMIT";
import { ZERO_ABI } from "../../abi/ZERO";
import ModalTpSl from "../../components/ModalTpSl";
import { toast } from "react-toastify";
import { useAccount, useNetwork } from "wagmi";
import DatePicker from "react-datepicker";
import classNames from "classnames";

import "./TradeBottom.css";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default function TradeBottom({
  bscdecimals,
  pairIndex,
  tokens,
  slippageP,
  outerActions,
  txs,
  price,
  selectedChainId,
}) {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const account = address;
  const active = address ? true : false;
  const chainId = chain?.id;
  selectedChainId = chain?.id;
  const [bottomOption, setBottomOption] = useState(2);
  const [tradeInfo, setTradeInfo] = useState({});
  const [limitsInfo, setLimitsInfo] = useState({ limits: [] });
  const [actions, setActions] = useState(0);
  const [isOpen, setOpenModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [tp, setTp] = useState(0);
  const [sl, setSl] = useState(0);
  const prevAmount = usePrevious({
    selectedChainId,
    account,
    active,
    pairIndex,
    actions,
    outerActions,
    chainId,
  });
  function formatDecimals(value, decimals, fix = 2) {
    let v = Number(value) / Math.pow(10, decimals);
    return v;
  }
  useEffect(() => {
    let data = { ...tradeInfo };
    if (!selectedChainId || !active || !account) {
      setTradeInfo({});
      return;
    }
    const updater = async () => {
      let positions = [];
      let positionInfos = [];
      let orders = [];
      let trades = [];
      const before = Date.now();
      const web3 = new Web3(BSCRPCURL);
      const storageContract = new web3.eth.Contract(
        STORAGE_ABI,
        STORAGE_ADDRESS
      );
      for (let i = 0; i < MAX_TRADES_PER_PAIR; i++) {
        const position = await storageContract.methods
          .openTrades(account, pairIndex, i)
          .call();

        if (
          Number(position.leverage) > 0 &&
          position.trader.toLowerCase() == account.toLowerCase()
        ) {
          positions.push(position);
          const positionInfo = await storageContract.methods
            .openTradesInfo(account, pairIndex, i)
            .call();
          positionInfos.push(positionInfo);
        }
      }
      for (let i = 0; i < MAX_TRADES_PER_PAIR; i++) {
        const has = await storageContract.methods
          .hasOpenLimitOrder(account, pairIndex, i)
          .call();
        if (!has) break;
        const orderId = await storageContract.methods
          .openLimitOrderIds(account, pairIndex, i)
          .call();
        const order = await storageContract.methods
          .openLimitOrders(orderId)
          .call();
        orders.push(order);
      }
      if (data[pairIndex] == undefined) data[pairIndex] = {};
      data[pairIndex].positions = positions;
      data[pairIndex].orders = orders;
      data[pairIndex].positionInfos = positionInfos;
      data[pairIndex].trades = trades;
      setTradeInfo(data);
    };
    if (
      selectedChainId &&
      (!prevAmount?.selectedChainId ||
        prevAmount?.account != account ||
        prevAmount?.active != active ||
        prevAmount?.pairIndex != pairIndex ||
        prevAmount?.actions != actions ||
        prevAmount?.outerActions != outerActions)
    ) {
      updater();
    }
  }, [account, active, pairIndex, actions, outerActions, selectedChainId]);
  useEffect(() => {
    let data = { ...limitsInfo };
    if (selectedChainId != 97 || !active || !account) {
      data.limits = [];
      setLimitsInfo(data);
      return;
    }

    let limits = [];
    const updater = async () => {
      const web3limit = new Web3(
        Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]
      );
      const limitContract = new web3limit.eth.Contract(
        LIMIT_ABI,
        LIMIT_ADDRESS_LIST[chainId]
      );
      const ctOrders = await limitContract.methods
        .getOrdersForAddressLength(account)
        .call();
      for (let i = 0; i < ctOrders; i++) {
        const orderI = await limitContract.methods
          .getOrderIdForAddress(account, i)
          .call();
        const order = await limitContract.methods.orderBook(orderI).call();
        if (order.orderState == 0) {
          limits.push(order);
        }
      }
      data.limits = limits;
      setLimitsInfo(data);
    };
    if (
      selectedChainId == 97 &&
      (prevAmount?.selectedChainId != 97 ||
        prevAmount?.account != account ||
        prevAmount?.active != active ||
        prevAmount?.actions != actions ||
        prevAmount?.outerActions != outerActions)
    ) {
      if (selectedChainId == 97) {
        updater();
      }
    }
  }, [account, active, pairIndex, actions, outerActions, selectedChainId]);
  async function updateTPSL(tp, sl, index) {
    toast.info("Started to update TP/SL.", {
      icon: ({ theme, type }) => <img src="/assets/image/icon/ic-info.svg" />,
    });
    const web3 = new Web3(
      Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]
    );
    const tradingContract = new web3.eth.Contract(
      TRADING_ABI,
      TRADING_ADDRESS_LIST[selectedChainId]
    );
    const btp = getBigNumber(tp * Math.pow(10, USDT_PRECISION));
    const bsl = getBigNumber(sl * Math.pow(10, USDT_PRECISION));
    const _index = tradeInfo[pairIndex]?.positions[index].index;

    let value;
    if (selectedChainId != 97) {
      const zeroContract = new web3.eth.Contract(
        ZERO_ABI,
        ZEROLAYER_ENDPOINT_LIST[selectedChainId]
      );
      const _adapterParams = ethers.utils.solidityPack(
        ["uint16", "uint"],
        [2, 600000]
      );
      const additionalValue = await zeroContract.methods
        .estimateFees(
          ZEROLAYER_CHAINID_LIST[97],
          TRADING_ADDRESS_LIST[97],
          "0x",
          false,
          _adapterParams
        )
        .call({ from: account });
      value = getBigNumber(additionalValue[0]);
      value = value.mul(1100).div(1000);
    } else {
      value = 0;
    }

    let gas = await tradingContract.methods
      .updateSl(pairIndex, _index, bsl)
      .estimateGas({
        from: account,
        value: value.toString(),
      });
    const rtSl = tradingContract.methods.updateSl(pairIndex, _index, bsl).send({
      from: account,
      gas,
      value: value.toString(),
    });
    gas = await tradingContract.methods
      .updateTp(pairIndex, _index, btp)
      .estimateGas({
        from: account,
        value: value.toString(),
      });
    const rtTp = tradingContract.methods.updateTp(pairIndex, _index, btp).send({
      from: account,
      gas,
      value: value.toString(),
    });
    toast.promise(Promise.all([rtSl, rtTp]), {
      pending: "Updating TP/SL.",
      success: {
        render() {
          return "Completed to update TP/SL.";
        },
        icon: ({ theme, type }) => (
          <img src="/assets/image/icon/ic-success.svg" />
        ),
      },
      error: {
        render() {
          return "Rejected to update.";
        },
        icon: ({ theme, type }) => (
          <img src="/assets/image/icon/ic-error.svg" />
        ),
      },
    });

    await rtSl;
    await rtTp;
    const mining = () =>
      new Promise((resolve) =>
        setTimeout(
          () => {
            setActions(actions + 1);
            resolve();
          },
          selectedChainId == 97 ? 5000 : 45000
        )
      );
    toast.promise(mining, {
      pending: "Update positions.",
      success: {
        render() {
          return "Completed to update.";
        },
        icon: ({ theme, type }) => (
          <img src="/assets/image/icon/ic-success.svg" />
        ),
      },
      error: {
        render() {
          return "Rejected mining";
        },
        icon: ({ theme, type }) => (
          <img src="/assets/image/icon/ic-error.svg" />
        ),
      },
    });
  }
  function getToken(address) {
    for (let i = 0; i < tokenMenu2.length; i++) {
      if (
        TOKENCONVERTOR[tokenMenu2[i].tideaddress][
          selectedChainId
        ].toLowerCase() == address.toLowerCase()
      ) {
        return tokenMenu2[i];
      }
    }
  }
  async function cancelLimitOrder(orderId) {
    toast.info("Started to cancel limit order.", {
      icon: ({ theme, type }) => <img src="/assets/image/icon/ic-info.svg" />,
    });
    const web3 = new Web3(
      Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]
    );
    const limitContract = new web3.eth.Contract(
      LIMIT_ABI,
      LIMIT_ADDRESS_LIST[selectedChainId]
    );
    try {
      const gas = await limitContract.methods.cancelOrder(orderId).estimateGas({
        from: account,
      });
      const rt = limitContract.methods.cancelOrder(orderId).send({
        gas: gas,
        from: account,
      });
      await toast.promise(rt, {
        pending: "Cancelling limit order.",
        success: {
          render() {
            return "Completed to cancel limit order.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-success.svg" />
          ),
        },
        error: {
          render() {
            return "Rejected to cancel to limit.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-error.svg" />
          ),
        },
      });
      setTimeout(() => setActions(actions + 1), 3000);
    } catch (error) {
      if (error.__proto__.name === "Error") {
        const start = error.message.indexOf("{");
        const end = error.message.indexOf("}");
        if (start >= 0 && end >= 0) {
          error = JSON.parse(error.message.substring(start, end + 1));
          toast.error(error.message, {
            icon: ({ theme, type }) => (
              <img src="/assets/image/icon/ic-error.svg" />
            ),
          });
        }
      }
      console.log({ error });
    }
  }
  async function closePosition(_pairIndex, _index) {
    console.log("aria _closePosition = ", _pairIndex, index, slippageP);
    toast.info("Started to close position", {
      icon: ({ theme, type }) => <img src="/assets/image/icon/ic-info.svg" />,
    });
    const web3 = new Web3(
      Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]
    );
    const tradingContract = new web3.eth.Contract(
      TRADING_ABI,
      TRADING_ADDRESS_LIST[selectedChainId]
    );
    let value;
    if (selectedChainId != 97) {
      const zeroContract = new web3.eth.Contract(
        ZERO_ABI,
        ZEROLAYER_ENDPOINT_LIST[selectedChainId]
      );
      const _adapterParams = ethers.utils.solidityPack(
        ["uint16", "uint"],
        [1, 600000]
      );
      const additionalValue = await zeroContract.methods
        .estimateFees(
          ZEROLAYER_CHAINID_LIST[97],
          TRADING_ADDRESS_LIST[97],
          "0x",
          false,
          _adapterParams
        )
        .call({ from: account });
      value = getBigNumber(additionalValue[0]);
      value = value.mul(1100).div(1000);
    } else {
      value = 0;
    }

    const web3bsc = new Web3(BSCRPCURL);
    const storageContract = new web3bsc.eth.Contract(
      STORAGE_ABI,
      STORAGE_ADDRESS
    );
    const opentrades = await storageContract.methods
      .openTradesCount(account, pairIndex)
      .call();
    const opemlimits = await storageContract.methods
      .openLimitOrdersCount(account, pairIndex)
      .call();
    try {
      const gas = await tradingContract.methods
        .closeTradeByUser(_pairIndex, _index, slippageP)
        .estimateGas({
          from: account,
          value: value.toString(),
        });
      const rt = tradingContract.methods
        .closeTradeByUser(_pairIndex, _index, slippageP)
        .send({
          gas,
          from: account,
          value: value.toString(),
        });

      const transaction = await toast.promise(rt, {
        pending: "Closing trade.",
        success: {
          render() {
            return "Sent transaction.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-success.svg" />
          ),
        },
        error: {
          render() {
            return "Rejected to close trade.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-error.svg" />
          ),
        },
      });
      const mining = () =>
        new Promise((resolve) => {
          const check = async () => {
            const opentradesafter = await storageContract.methods
              .openTradesCount(account, pairIndex)
              .call();
            const opemlimitsafter = await storageContract.methods
              .openLimitOrdersCount(account, pairIndex)
              .call();
            if (
              Number(opentradesafter) != Number(opentrades) ||
              Number(opemlimitsafter) != Number(opemlimits)
            ) {
              setActions(actions + 1);
              setTimeout(resolve, 5000);
            } else {
              setTimeout(check, 10000);
            }
          };
          setTimeout(check, selectedChainId == 97 ? 5000 : 40000);
        });
      toast.promise(mining, {
        pending: "Update positions.",
        success: {
          render() {
            return "Completed to update.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-success.svg" />
          ),
        },
        error: {
          render() {
            return "Faild to update.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-error.svg" />
          ),
        },
      });
    } catch (error) {
      if (error.__proto__.name === "Error") {
        const start = error.message.indexOf("{");
        const end = error.message.indexOf("}");
        if (start >= 0 && end >= 0) {
          error = JSON.parse(error.message.substring(start, end + 1));
          toast(error.message, {
            icon: ({ theme, type }) => (
              <img src="/assets/image/icon/ic-error.svg" />
            ),
          });
        }
      }
      console.log({ error });
    }
  }
  async function cancelOrder(_pairIndex, _index) {
    toast.info("Started to cancel order.", {
      icon: ({ theme, type }) => <img src="/assets/image/icon/ic-info.svg" />,
    });
    const web3 = new Web3(
      Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]
    );
    const tradingContract = new web3.eth.Contract(
      TRADING_ABI,
      TRADING_ADDRESS_LIST[selectedChainId]
    );
    let value;
    if (selectedChainId != 97) {
      const zeroContract = new web3.eth.Contract(
        ZERO_ABI,
        ZEROLAYER_ENDPOINT_LIST[selectedChainId]
      );
      const _adapterParams = ethers.utils.solidityPack(
        ["uint16", "uint"],
        [2, 600000]
      );
      const additionalValue = await zeroContract.methods
        .estimateFees(
          ZEROLAYER_CHAINID_LIST[97],
          TRADING_ADDRESS_LIST[97],
          "0x",
          false,
          _adapterParams
        )
        .call({ from: account });
      value = getBigNumber(additionalValue[0]);
      value = value.mul(1100).div(1000);
    } else {
      value = 0;
    }
    const web3bsc = new Web3(BSCRPCURL);
    const storageContract = new web3bsc.eth.Contract(
      STORAGE_ABI,
      STORAGE_ADDRESS
    );
    const opentrades = await storageContract.methods
      .openTradesCount(account, pairIndex)
      .call();
    const opemlimits = await storageContract.methods
      .openLimitOrdersCount(account, pairIndex)
      .call();

    try {
      const gas = await tradingContract.methods
        .cancelOrder(_pairIndex, _index)
        .estimateGas({
          from: account,
          value: value.toString(),
        });
      const rt = tradingContract.methods.cancelOrder(_pairIndex, _index).send({
        gas,
        from: account,
        value: value.toString(),
      });
      await toast.promise(rt, {
        pending: "Cancelling order.",
        success: {
          render() {
            return "Sent transaction.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-success.svg" />
          ),
        },
        error: {
          render() {
            return "Rejected to cancel.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-error.svg" />
          ),
        },
      });
      const mining = () =>
        new Promise((resolve) => {
          const check = async () => {
            const opentradesafter = await storageContract.methods
              .openTradesCount(account, pairIndex)
              .call();
            const opemlimitsafter = await storageContract.methods
              .openLimitOrdersCount(account, pairIndex)
              .call();
            if (
              Number(opentradesafter) != Number(opentrades) ||
              Number(opemlimitsafter) != Number(opemlimits)
            ) {
              setActions(actions + 1);
              setTimeout(resolve, 5000);
            } else {
              setTimeout(check, 10000);
            }
          };
          setTimeout(check, selectedChainId == 97 ? 5000 : 40000);
        });
      toast.promise(mining, {
        pending: "Update positions.",
        success: {
          render() {
            return "Completed to update.";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-success.svg" />
          ),
        },
        error: {
          render() {
            return "Failed to update";
          },
          icon: ({ theme, type }) => (
            <img src="/assets/image/icon/ic-error.svg" />
          ),
        },
      });
    } catch (error) {
      if (error.__proto__.name === "Error") {
        const start = error.message.indexOf("{");
        const end = error.message.indexOf("}");
        if (start >= 0 && end >= 0) {
          error = JSON.parse(error.message.substring(start, end + 1));
          toast.error(error.message, {
            icon: ({ theme, type }) => (
              <img src="/assets/image/icon/ic-error.svg" />
            ),
          });
        }
      }
      console.log({ error });
    }
  }
  function profit(buy, positionInfo, openPrice) {
    const amount = buy
      ? formatDecimals(positionInfo.positionAmount, tokens[pairIndex].decimals)
      : formatDecimals(positionInfo.borrowAmount, USDT_PRECISION);
    const profitAll =
      Number(amount) *
      (buy
        ? Number(price) - Number(openPrice)
        : -Number(price) + Number(openPrice));
    return profitAll.toFixed(2);
  }

  function changeTpSl(id) {
    setTp(tradeInfo[pairIndex]?.positions[id].tp);
    setSl(tradeInfo[pairIndex]?.positions[id].sl);
    setIndex(id);
    setOpenModal(true);
  }
  return (
    <div className="sc-kLOYGq hJfobJ">
      <ModalTpSl
        isOpen={isOpen}
        setOpenModal={setOpenModal}
        updateTPSL={updateTPSL}
        index={index}
        Tp={tp}
        Sl={sl}
      />
      <div className="sc-bqgqQP kHQpEn">
        <div className="sc-iNezeW gQyuGT font-space">
          <div
            className={classNames(
              "sc-bnouOt",
              bottomOption === 2 ? "dAcix" : "uXULR"
            )}
            onClick={() => setBottomOption(2)}
          >
            Positions{" "}
          </div>
          <div
            className={classNames(
              "sc-bnouOt",
              bottomOption === 3 ? "dAcix" : "uXULR"
            )}
            onClick={() => setBottomOption(3)}
          >
            Orders{" "}
          </div>
        </div>
        {bottomOption === 2 && (
          <div className="sc-iKmDcA jjvqPU">
            <div className="sc-inRwDn ipvYdG">
              {(!tradeInfo[pairIndex] ||
                tradeInfo[pairIndex].positions.length == 0) && (
                <div className="sc-dpRLZP jbnRpY">
                  <img src="/assets/image/icon/ic-no-position.png" alt="" />
                  <div className="sc-bgnbwU fUbBdH">No Positions</div>
                </div>
              )}
              {getWindowSize().innerWidth > 750 &&
                tradeInfo[pairIndex]?.positions.length > 0 && (
                  <div className="trades-table  enTViw">
                    <div className="box swap-item">
                      <table style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <td>Symbol</td>
                            <td>Side</td>
                            <td>Size</td>
                            <td>Collateral</td>
                            <td>Leverage</td>
                            <td>Entry Price</td>
                            <td>Liq. Price</td>
                            <td>Pnl</td>
                            <td>TP/SL</td>
                            <td>Close</td>
                          </tr>
                        </thead>
                        <tbody>
                          {tradeInfo[pairIndex]?.positions.map(
                            (position, i) => {
                              if (tokens.length == 0) return <></>;
                              return (
                                <tr key={i} className="tradinginfo">
                                  <td>{tokens[position.pairIndex].symbol}</td>
                                  <td
                                    className={
                                      position.buy ? "positive" : "negative"
                                    }
                                  >
                                    {position.buy ? "buy" : "sell"}
                                  </td>
                                  <td>
                                    {position.buy
                                      ? numberFormat(
                                          formatDecimals(
                                            tradeInfo[pairIndex]?.positionInfos[
                                              i
                                            ].positionAmount,
                                            tokens[position.pairIndex].decimals
                                          )
                                        )
                                      : numberFormat(
                                          formatDecimals(
                                            tradeInfo[pairIndex]?.positionInfos[
                                              i
                                            ].borrowAmount,
                                            USDT_PRECISION
                                          )
                                        )}
                                    {tokens[position.pairIndex].symbol}
                                  </td>
                                  <td>
                                    {numberFormat(
                                      formatDecimals(
                                        position.positionSizeDai,
                                        USDT_PRECISION
                                      )
                                    )}
                                  </td>
                                  <td>{position.leverage}</td>
                                  <td>
                                    {numberFormat(
                                      formatDecimals(
                                        position.openPrice,
                                        USDT_PRECISION
                                      )
                                    )}
                                  </td>
                                  <td>
                                    {numberFormat(
                                      formatDecimals(
                                        tradeInfo[pairIndex]?.positionInfos[i]
                                          .liq,
                                        USDT_PRECISION
                                      ),
                                      tokens[position.pairIndex].bscdecimals
                                    )}
                                  </td>
                                  <td>
                                    {profit(
                                      position.buy,
                                      tradeInfo[pairIndex]?.positionInfos[i],
                                      Number(position.openPrice) /
                                        Math.pow(10, USDT_PRECISION)
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      className="action wallet-menu-item"
                                      onClick={() => changeTpSl(i)}
                                    >
                                      TP/SL
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        closePosition(
                                          position.pairIndex,
                                          position.index
                                        )
                                      }
                                      className="action wallet-menu-item"
                                    >
                                      Close
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              {getWindowSize().innerWidth <= 750 &&
                tradeInfo[pairIndex]?.positions.length > 0 &&
                tradeInfo[pairIndex]?.positions.map((position, i) => {
                  if (tokens.length == 0) return <></>;
                  return (
                    <div
                      className=" enTViw tradelist mobile-trades"
                      key={i}
                      style={{ borderBottom: "1px solid #202649" }}
                    >
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Symbol</div>
                        <div className="align-right strong">
                          {tokens[position.pairIndex].symbol}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Side</div>
                        <div
                          className={
                            "align-right strong " +
                            (position.buy ? "positive" : "negative")
                          }
                        >
                          {position.buy ? "buy" : "sell"}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Size</div>
                        <div className="align-right strong">
                          {position.buy
                            ? numberFormat(
                                formatDecimals(
                                  tradeInfo[pairIndex]?.positionInfos[i]
                                    .positionAmount,
                                  tokens[position.pairIndex].decimals
                                )
                              )
                            : numberFormat(
                                formatDecimals(
                                  tradeInfo[pairIndex]?.positionInfos[i]
                                    .borrowAmount,
                                  USDT_PRECISION
                                )
                              )}
                          {tokens[position.pairIndex].symbol}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Collateral</div>
                        <div className="align-right strong">
                          {numberFormat(
                            formatDecimals(
                              position.positionSizeDai,
                              USDT_PRECISION
                            )
                          )}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Leverage</div>
                        <div className="align-right strong">
                          {position.leverage}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Entry Price</div>
                        <div className="align-right strong">
                          {numberFormat(
                            formatDecimals(position.openPrice, USDT_PRECISION),
                            tokens[position.pairIndex].bscdecimals
                          )}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Liq. Price</div>
                        <div className="align-right strong">
                          {numberFormat(
                            formatDecimals(
                              tradeInfo[pairIndex]?.positionInfos[i].liq,
                              USDT_PRECISION
                            ),
                            tokens[position.pairIndex].decimals
                          )}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Pnl</div>
                        <div className="align-right strong">
                          {profit(
                            position.buy,
                            tradeInfo[pairIndex]?.positionInfos[i],
                            Number(position.openPrice) /
                              Math.pow(10, USDT_PRECISION)
                          )}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">TP/SL</div>
                        <div
                          className="align-right strong action"
                          onClick={() => changeTpSl(i)}
                        >
                          Manage TP/SL
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Close</div>
                        <div
                          className="align-right strong action"
                          onClick={() =>
                            closePosition(position.pairIndex, position.index)
                          }
                        >
                          Close
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label"></div>
                        <div className="align-right strong action"></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {bottomOption === 3 && (
          <div className="sc-iKmDcA jjvqPU">
            <div className="sc-inRwDn ipvYdG">
              {(!tradeInfo[pairIndex] ||
                tradeInfo[pairIndex].orders.length == 0) && (
                <div className="sc-dpRLZP jbnRpY">
                  <img src="/assets/image/icon/ic-no-order.png" alt="" />
                  <div className="sc-bgnbwU fUbBdH">No Orders</div>
                </div>
              )}
              {getWindowSize().innerWidth > 750 &&
                tradeInfo[pairIndex]?.orders.length > 0 && (
                  <div className="trades-table  enTViw">
                    <div className="box swap-item">
                      <table style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <td>Symbol</td>
                            <td>Side</td>
                            <td>Open Price</td>
                            <td>Collateral</td>
                            <td>Leverage</td>
                            <td>Action</td>
                          </tr>
                        </thead>
                        <tbody>
                          {tradeInfo[pairIndex]?.orders.map((order, i) => {
                            if (tokens.length == 0) return <></>;
                            return (
                              <tr key={i} className="tradinginfo">
                                <td>{tokens[order.pairIndex].symbol}</td>
                                <td
                                  className={
                                    order.buy ? "positive" : "negative"
                                  }
                                >
                                  {order.buy ? "buy" : "sell"}
                                </td>
                                <td>
                                  {numberFormat(
                                    formatDecimals(
                                      order.minPrice,
                                      USDT_PRECISION
                                    ),
                                    tokens[order.pairIndex].bscdecimals
                                  )}
                                </td>
                                <td>
                                  {numberFormat(
                                    formatDecimals(
                                      order.positionSize,
                                      USDT_PRECISION
                                    )
                                  )}
                                </td>
                                <td>{order.leverage}</td>
                                <td
                                  className="action"
                                  onClick={() =>
                                    cancelOrder(order.pairIndex, order.index)
                                  }
                                >
                                  Cancel
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              {getWindowSize().innerWidth <= 750 &&
                tradeInfo[pairIndex]?.orders.length > 0 &&
                tradeInfo[pairIndex]?.orders.map((order, i) => {
                  if (tokens.length == 0) return <></>;
                  return (
                    <div className="tradelist  enTViw mobile-trades" key={i}>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Symbol</div>
                        <div className="align-right strong">
                          {tokens[order.pairIndex].symbol}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Side</div>
                        <div
                          className={
                            "align-right strong" + order.buy
                              ? "positive"
                              : "negative"
                          }
                        >
                          {order.buy ? "buy" : "sell"}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Open Price</div>
                        <div className="align-right strong">
                          {numberFormat(
                            formatDecimals(order.minPrice, USDT_PRECISION),
                            tokens[order.pairIndex].bscdecimals
                          )}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Collateral</div>
                        <div className="align-right strong">
                          {numberFormat(
                            formatDecimals(order.positionSize, USDT_PRECISION)
                          )}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Leverage</div>
                        <div className="align-right strong">
                          {order.leverage}
                        </div>
                      </div>
                      <div className="Exchange-info-row">
                        <div className="Exchange-info-label">Action</div>
                        <div
                          className="align-right strong action"
                          onClick={() =>
                            cancelOrder(order.pairIndex, order.index)
                          }
                        >
                          Close
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
