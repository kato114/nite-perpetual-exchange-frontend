import { useState, useEffect, useRef } from "react";

import "./markets.css";

import ethereum_logo from "../../assets/img/ethereum.png";
import up_icon from "../../assets/img/up.png";
import down_icon from "../../assets/img/down.png";

import tmp_up_chart from "../../assets/img/up-chart.png";
import tmp_down_chart from "../../assets/img/down-chart.png";

const DATES = ["1H", "1D", "1W", "1M", "1Y"];

export default function Markets() {
  const dateSelectRef = useRef(null);
  const [chosenDate, setChosenDate] = useState("1");
  const [openDateSelect, setOpenDateSelect] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dateSelectRef.current &&
        !dateSelectRef.current.contains(event.target) &&
        event.target.className != "date-select-box"
      ) {
        setOpenDateSelect(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  let tokens = [
    {
      name: "Ether",
      symbol: "ETH",
      logoUrl:
        "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1696503332",
      price: 1674.95,
      change: 2.56,
      tvl: "1.1B",
      volume: "687.3M",
    },
    {
      name: "Tether",
      symbol: "USDT",
      logoUrl:
        "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
      price: 1.0001,
      change: -0.006,
      tvl: "1M",
      volume: "7.1M",
    },
    {
      name: "BNB",
      symbol: "BNB",
      logoUrl:
        "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1696501970",
      price: 321.4,
      change: 5.56,
      tvl: "34k",
      volume: "2345",
    },
    {
      name: "Ether",
      symbol: "ETH",
      logoUrl:
        "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1696503332",
      price: 1674.95,
      change: 2.56,
      tvl: "1.1B",
      volume: "687.3M",
    },
    {
      name: "Tether",
      symbol: "USDT",
      logoUrl:
        "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
      price: 1.0001,
      change: -0.006,
      tvl: "1M",
      volume: "7.1M",
    },
    {
      name: "BNB",
      symbol: "BNB",
      logoUrl:
        "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1696501970",
      price: 321.4,
      change: 5.56,
      tvl: "34k",
      volume: "2345",
    },
    {
      name: "Ether",
      symbol: "ETH",
      logoUrl:
        "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1696503332",
      price: 1674.95,
      change: 2.56,
      tvl: "1.1B",
      volume: "687.3M",
    },
    {
      name: "Tether",
      symbol: "USDT",
      logoUrl:
        "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
      price: 1.0001,
      change: -0.006,
      tvl: "1M",
      volume: "7.1M",
    },
    {
      name: "BNB",
      symbol: "BNB",
      logoUrl:
        "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1696501970",
      price: 321.4,
      change: 5.56,
      tvl: "34k",
      volume: "2345",
    },
  ];

  return (
    <div className="wholediv markets">
      <div className="titleBlank">Best Tokens on ExchangeName</div>
      <div className="filter">
        <div className="network-select-box w-[calc(100%-90px)] md:w-auto">
          <img src={ethereum_logo} width="20px" height="auto" />
          <span>Ethereum</span>
        </div>
        <div>
          <div
            className="date-select-box"
            onClick={(e) => setOpenDateSelect(!openDateSelect)}
          >
            {DATES[chosenDate]}
          </div>
          <div
            ref={dateSelectRef}
            className={`date-select-dropdown ${openDateSelect ? "open" : ""} `}
          >
            {DATES.map((date, key) => {
              return (
                <div
                  key={key}
                  className={`date-select-dropdown-option ${
                    chosenDate == key ? "active" : ""
                  }`}
                  onClick={(e) => {
                    setChosenDate(key);
                    setOpenDateSelect(false);
                  }}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </div>
        <input
          type="text"
          placeholder="Filter Tokens"
          className="w-full md:w-auto"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="">
          <tr>
            <th className="text-left" width="10px">
              #
            </th>
            <th className="text-left">Token Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Change</th>
            <th className="text-right">TVL</th>
            <th className="text-right">Volume</th>
            <th width="15%"></th>
          </tr>
          {tokens.map((token, key) => {
            return (
              <tr key={key}>
                <td className="text-left">{key + 1}</td>
                <td className="text-left">
                  <div className="flex gap-2 items-center">
                    <img src={token.logoUrl} width="32px" alt="token logo" />
                    <span>{token.name}</span>
                    <span className="token-symbol">{token.symbol}</span>
                  </div>
                </td>
                <td className="text-right whitespace-nowrap">
                  $ {token.price}
                </td>
                <td className="text-right whitespace-nowrap">
                  <div
                    className={
                      token.change >= 0
                        ? "token-change-up"
                        : "token-change-down"
                    }
                  >
                    <img src={token.change >= 0 ? up_icon : down_icon} />
                    <span>{token.change}%</span>
                  </div>
                </td>
                <td className="text-right whitespace-nowrap">$ {token.tvl}</td>
                <td className="text-right whitespace-nowrap">
                  $ {token.volume}
                </td>
                <td className="flex justify-center min-w-[100px]">
                  <img
                    src={token.change >= 0 ? tmp_up_chart : tmp_down_chart}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
