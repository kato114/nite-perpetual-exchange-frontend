import { useState, useRef, useEffect } from "react";

import "./TokenSelecor.css";

import icon_close from "../../assets/img/exit.png";
import icon_divider from "../../assets/img/divider.png";

import { CG_TOKENS } from "../cgtokens";

export default function TokenSelecor(props) {
  const { hideModal, setToken } = props;

  const modalRef = useRef(null);
  const [filter, setFilter] = useState("");

  const COMMON_TOKENS = CG_TOKENS.filter((token) => token.common == true);
  const [tokens, setTokens] = useState(CG_TOKENS);

  useEffect(() => {
    if (filter.length > 0) {
      let filterd = CG_TOKENS.filter((token) =>
        (token.name + " " + token.symbol + " " + token.address)
          .toLowerCase()
          .includes(filter.toLowerCase())
      );

      setTokens(filterd);
    } else {
      setTokens(CG_TOKENS);
    }
  }, [filter]);

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (!modalRef.current.contains(e.target)) {
          hideModal(false);
        }
      }}
    >
      <div className="modal-tokens" ref={modalRef}>
        <div className="modal-header">
          <p>Select a token</p>
          <img
            src={icon_close}
            className="cursor-pointer"
            onClick={(e) => {
              hideModal(false);
            }}
          />
        </div>
        <div className="modal-body">
          <input
            className="filter"
            type="text"
            placeholder="Search name or paste address"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COMMON_TOKENS.map((token, key) => {
              return (
                <div
                  key={key}
                  className="common-token"
                  onClick={(e) => {
                    setToken(token);
                    hideModal(false);
                  }}
                >
                  <img
                    src={token.logoURI}
                    alt={`${token.symbol} Logo`}
                    width="20px"
                  />
                  <span>{token.symbol}</span>
                </div>
              );
            })}
          </div>
          <img src={icon_divider} width="100%" />
          <div className="list-tokens">
            {tokens.map((token, key) => {
              if (key < 100)
                return (
                  <div
                    key={key}
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={(e) => {
                      setToken(token);
                      hideModal(false);
                    }}
                  >
                    <img src={token.logoURI} width="32px" alt="token logo" />
                    <span>{token.name}</span>
                    <span className="token-symbol">{token.symbol}</span>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
