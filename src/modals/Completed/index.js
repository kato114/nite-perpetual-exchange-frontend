import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {toFixed,getBigNumber,timeConverter, numberFormat, truncateAddress} from "../../components/utils";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
};

export default function TradeCompleted({ 
  visitUrl,
  fromSymbol,
  fromAmount,
  swapOption,
  lastEntryprice,
  isOpen, closeModal}) {

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-completed" sx={style}>
        <div class="sc-hAsxaJ ia-DxTe">
          <div class="sc-yeoIj fYAHzI">
            <div class="sc-caXVBt btrGPJ"></div>
            <div class="sc-bPyhqo iijVdv" onClick={closeModal}></div>
          </div>

          <div className="sc-izEbhJ kqnjtX" style={{padding:"20px"}}>
            <div className="sc-lmHNfd ">
              <img className="iconConfirm" src="\assets\image\icon\checkbox.svg" width="32px" height="32px"/>
            </div>
            <div className="sc-lmHNfd titleCompleted">
              TRANSACTION SUBMITTED
            </div>
            <div className="sc-lmHNfd contentsCompleted">
              {fromSymbol} {swapOption==0?"LONG":"SHORT"} by ${fromAmount} (price {swapOption==0?"≤":"≥"} {lastEntryprice})
            </div>
            <div className="sc-lmHNfd visitLink">
              <a href={visitUrl}  target='_blank'>Visit BlockChain Explorer</a>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
