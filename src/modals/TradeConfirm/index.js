import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { numberFormat } from "../../components/utils";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
};

export default function TradeConfirm({
  slippage,
  entryprice,
  bscdecimals,
  fromAmount,
  slider,
  fromSymbol,
  swapOption,
  handleOpenPosition,
  isOpen,
  closeModal,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-trade-confirm" sx={style}>
        <div className={"sc-hAsxaJ ia-DxTe" + (swapOption == 0 ? "" : " sell")}>
          <div className="sc-yeoIj fYAHzI">
            <div className="sc-caXVBt btrGPJ font-space">
              Open {fromSymbol} Position
              <span
                className={
                  swapOption == 0
                    ? "text-[#17DC22] ml-1"
                    : "text-[#FA5C35] ml-1"
                }
              >
                {" "}
                - {swapOption == 0 ? "Long" : "Short"} {slider}X{" "}
              </span>
            </div>
            <div
              className={"sc-bPyhqo iijVdv" + (swapOption == 0 ? "" : " sell")}
              onClick={closeModal}
            ></div>
          </div>
          <div className="sc-gkJlnC eqDBwb"></div>
          <div className="sc-izEbhJ kqnjtX" style={{ padding: "20px" }}>
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
                  {numberFormat(entryprice, bscdecimals)}
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
            <div className="sc-lmHNfd bWgAxR">
              <div className="left">
                <label
                  fontSize="14"
                  color="#b9b9b9"
                  className="sc-hAZoDl enTViw sc-fEOsli mHzli"
                >
                  Slippage
                </label>
              </div>
              <div className="sc-bdxVC kmgYZf">
                <label
                  fontSize="14"
                  color="#ffb313"
                  className="sc-hAZoDl enXSfk sc-fEOsli mHzli"
                >
                  {slippage}%
                </label>
              </div>
            </div>
            {swapOption == 0 ? (
              <button
                className="sc-fbPSWO sc-fzCEhR cYmVog kDKenN"
                onClick={() => {
                  closeModal();
                  handleOpenPosition();
                }}
              >
                Confirm
              </button>
            ) : (
              <button
                className="sc-fbPSWO sc-fzCEhR cYmVoh kDKenN"
                onClick={() => {
                  closeModal();
                  handleOpenPosition();
                }}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
