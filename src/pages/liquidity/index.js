import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";

import Config from "../../components/config";

import TokenSelecor from "../../components/TokenSelector";
import TokenInformation from "../../components/TokenInformation";

import "./liquidity.css";

import icon_back from "../../assets/img/back.png";
import icon_plus from "../../assets/img/plus.png";
import icon_union from "../../assets/img/union.png";
import icon_setting from "../../assets/img/setting.png";
import icon_black_down from "../../assets/img/black-down.png";
import icon_pencil from "../../assets/img/pencil.png";
import icon_web from "../../assets/img/Web.png";
import icon_cmc from "../../assets/img/cmc.png";
import icon_cg from "../../assets/img/cg.png";
import icon_tg from "../../assets/img/tg.png";

import eth_logo from "../../assets/img/ethereum.png";

const PERIODS = ["1M", "3M", "6M", "1Y"];

const trimAddress = (addr) => {
  return `${addr.substring(0, 8)}...${addr.substring(35)}`;
};

export default function Liquidity() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const { isConnected } = useAccount();

  const [native, setNative] = useState(true);
  const [token, setToken] = useState(null);
  const [openTokenModal, setOpenTokenModal] = useState(false);

  const [info, setInfo] = useState(null);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const [amount, setAmount] = useState(0);

  const periodRef = useRef(null);
  const [lockPeriod, setLockPeriod] = useState("0");
  const [endDate, setEndDate] = useState("");
  const [showPeriod, setShowPeriod] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        periodRef.current &&
        !periodRef.current.contains(event.target) &&
        !event.target.className.includes("btn-calendar") &&
        !event.target.className.includes("btn-calendar-img")
      ) {
        setShowPeriod(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    switch (lockPeriod) {
      case 0:
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 1:
        currentDate.setMonth(currentDate.getMonth() + 3);
        break;
      case 2:
        currentDate.setMonth(currentDate.getMonth() + 4);
        break;
      case 3:
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
    }

    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    setEndDate(currentDate.toLocaleDateString("en-US", options));
  }, [lockPeriod]);

  return (
    <div className="wholediv liquidity">
      <div className="liquidity-panel">
        <div className="panel-header flex justify-between">
          <Link to="/pools">
            <img src={icon_back} />
          </Link>
          <h4>{type == "withdraw" ? "Withdraw" : "Add"} liquidity</h4>
          <img src={icon_setting} />
        </div>
        <div className="panel-body grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="flex flex-col gap-5 justify-between">
            {token == null ? (
              <div
                className="choose-token"
                onClick={(e) => setOpenTokenModal(true)}
              >
                Select Token
              </div>
            ) : (
              <div className="amount-panel flex justify-between items-center">
                <Link
                  to={`${Config().scanUrl}${token.address}`}
                  target="_blank"
                >
                  <span>{trimAddress(token.address)}</span>
                </Link>
                <div
                  className="select-token !w-fit md:!w-[100px] bg-transparent	"
                  onClick={(e) => setOpenTokenModal(true)}
                >
                  <img src={token.logoURI} alt="ETH Logo" width="20px" />
                  <span className="hidden md:block">{token.symbol}</span>
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <img src={icon_plus} />
            </div>
            <div className="amount-panel">
              <div className="flex justify-between items-center">
                <input
                  className="w-[calc(100%-100px)]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onClick={(e) => e.target.select()}
                />
                {native ? (
                  <div
                    className="select-token"
                    onClick={(e) => setNative(token == null ? true : false)}
                  >
                    <img src={eth_logo} alt="ETH Logo" width="20px" />
                    <span>ETH</span>
                  </div>
                ) : (
                  <div
                    className="select-token"
                    onClick={(e) => setNative(true)}
                  >
                    <img src={token.logoURI} alt="Token Logo" width="20px" />
                    <span>{token.symbol}</span>
                  </div>
                )}
              </div>
              {token !== null && (
                <div className="flex justify-end items-center gap-2 mt-4">
                  <p>Balance: 0.0</p>
                  <button className="btn-max">Max</button>
                </div>
              )}
            </div>
            <div>
              <p>Unlock date</p>
              <div className="date-panel mt-3">
                <div>
                  <p>{endDate}</p>
                  <p>in {PERIODS[lockPeriod]}</p>
                </div>
                <div>
                  <button
                    className="btn-calendar flex justify-between items-center"
                    onClick={(e) => setShowPeriod(!showPeriod)}
                  >
                    <img className="btn-calendar-img" src={icon_union} />
                    <img className="btn-calendar-img" src={icon_black_down} />
                  </button>
                  <div
                    ref={periodRef}
                    className={`period-select-dropdown ${
                      showPeriod ? "open" : ""
                    } `}
                  >
                    {PERIODS.map((period, key) => {
                      return (
                        <div
                          key={key}
                          className={`period-select-dropdown-option ${
                            lockPeriod == key ? "active" : ""
                          }`}
                          onClick={(e) => {
                            setLockPeriod(key);
                            setShowPeriod(false);
                          }}
                        >
                          {period}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="tip-panel">
              When you add liquidity to a trading pair on the exchange, your
              transaction initiates trading activities, and the pool of assets
              you added becomes available for use by all users of the exchange.
              You have to lock your tokens, and you won't be able to withdraw
              them until the time you've set up elapses. Please note that a fee
              of 0.25 ETH will be added to this transaction. Additionally, the
              minimum deposit is equivalent to $2,500 in tokens or Ethereum
              coin.
            </div>
            <div>
              <p>Token Information</p>
              {info == null ? (
                <div
                  className="info-panel flex flex-col items-center cursor-pointer"
                  onClick={(e) => setOpenInfoModal(true)}
                >
                  <img src={icon_pencil} />
                  <div className="flex flex-col gap-1">
                    <p>Fill Information</p>
                    <p>about</p>
                    <p>project</p>
                  </div>
                </div>
              ) : (
                <div className="info-panel flex flex-col gap-3">
                  <div
                    className="flex justify-end items-center gap-2 cursor-pointer"
                    onClick={(e) => setOpenInfoModal(true)}
                  >
                    Edit
                    <img src={icon_pencil} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <img src={icon_web} />
                      <p>{info.web}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={icon_cmc} />
                      <p>{info.cmc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={icon_tg} />
                      <p>{info.tg}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={icon_cg} />
                      <p>{info.cg}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="panel-footer flex justify-center mt-5">
          <button className="px-24 md:px-32 py-2">
            {isConnected ? "Proceed" : "Connect Wallet"}
          </button>
        </div>
      </div>
      {openTokenModal && (
        <TokenSelecor hideModal={setOpenTokenModal} setToken={setToken} />
      )}
      {openInfoModal && (
        <TokenInformation
          hideModal={setOpenInfoModal}
          setInfo={setInfo}
          info={info}
        />
      )}
    </div>
  );
}
