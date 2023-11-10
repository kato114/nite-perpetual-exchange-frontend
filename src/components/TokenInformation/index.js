import { useRef, useState } from "react";

import "./TokenInformation.css";

import icon_close from "../../assets/img/exit.png";
import icon_divider from "../../assets/img/divider.png";

export default function TokenInformation(props) {
  const { info, setInfo, hideModal } = props;

  const [data, setData] = useState({
    web: info == null ? "" : info.web,
    cmc: info == null ? "" : info.cmc,
    tg: info == null ? "" : info.tg,
    cg: info == null ? "" : info.cg,
  });

  const modalRef = useRef(null);

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (!modalRef.current.contains(e.target)) {
          hideModal(false);
        }
      }}
    >
      <div className="modal-info" ref={modalRef}>
        <div className="modal-header">
          <p>Token information</p>
          <img
            src={icon_close}
            className="cursor-pointer"
            onClick={(e) => {
              hideModal(false);
            }}
          />
        </div>
        <img src={icon_divider} width="100%" />
        <div className="modal-body">
          <div className="flex flex-col gap-2">
            <label>Website address</label>
            <input
              type="text"
              placeholder="Website address"
              value={data.web}
              onChange={(e) => setData({ ...data, web: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Community Channel</label>
            <input
              type="text"
              placeholder="Community Channel"
              value={data.cmc}
              onChange={(e) => setData({ ...data, cmc: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>CoinmarketCap</label>
            <input
              type="text"
              placeholder="CoinmarketCap"
              value={data.tg}
              onChange={(e) => setData({ ...data, tg: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>CoinGecko</label>
            <input
              type="text"
              placeholder="CoinGecko"
              value={data.cg}
              onChange={(e) => setData({ ...data, cg: e.target.value })}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="w-full"
            onClick={(e) => {
              setInfo(data);
              hideModal(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
