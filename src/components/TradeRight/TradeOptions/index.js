import { useEffect, useState } from "react";
import {toFixed,getBigNumber,timeConverter, numberFormat, truncateAddress} from "../../utils";
import FiatRam from "../../../modals/FiatRamp"
import classNames from "classnames";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";

import "./TradeOptions.css";

const LeverageSlider = ({
  customizeSelected,
  setCustomizeSelected,
  leverageSelected,
  setLeverageSelected
}) => {
  const minVal = 2;
  const maxVal=150;
  const stepVal =[2,25,50,75,100,125,150]
  return (
    <div className="sc-jtGjJS jbYmdy">
      <div className="sc-ebPQXL fxasea">
        <div className="sc-gcFSfr bLAwDl">
          <div className="sc-iYsgxs PdyLS">
            <label
              fontSize="13"
              color="#fff"
              className="sc-hAZoDl jbsPtW sc-fEOsli mHzli"
            >
              Leverage
            </label>
            <div className="sc-dIouRR dhfupG">
              <Tooltip
                title="Leverage is calculated by dividing position size by the amount of collateral you wish to allocate for the trade"
                placement="top"
                arrow
                enterTouchDelay={0}
              >
                <div className="sc-dmRaPn gsoPia"></div>
              </Tooltip>
            </div>
          </div>
          <div className="sc-dGBNLl hAIwkn">
            <label>{leverageSelected}x</label>
          </div>
        </div>
        {/*
          <div
            className="sc-bIStaS juBVsV"
            onClick={() => setCustomizeSelected(!customizeSelected)}
          >
            <div
              size="14"
              className={classNames(
                "sc-kKoOxK",
                customizeSelected ? "dFVhFV" : "ecohse"
              )}
            >
              {!customizeSelected && <img src="" alt="" />}
              {customizeSelected && (
                <img src="/assets/image/icon/ic-checked.png" alt="" />
              )}
            </div>
            <label>Customize</label>
          </div>
        */}
      </div>
      <div className="sc-jttdOI eQVbHF">
        <div className="sc-fUOEQR eYBJpA">
          <div className="sc-ejFbIL kdVGuz">
            <div
              style={{
                width:
                  "calc(" +
                  Math.floor((leverageSelected - minVal) * (100/(maxVal-minVal))) +
                  "% " +
                  (leverageSelected <= 75 ? "+" : "-") +
                  " 6px)",
              }}
              className="sc-hIjAGC dZYukw"
            ></div>
          </div>
          <div className="sc-llTkbl fXAYOS">
            {
              stepVal.map((val,i)=>{
                return(
                  <div key={i} className="sc-EXiSP cZocht">
                    <div opacity="1" className="sc-hHlrlp ctdOCm"></div>
                    <div className="sc-lfPQjg zXRTM">{val}x</div>
                    <div x={(100/(maxVal-minVal)*(val-minVal)).toString()} className="sc-edBHQG bBVrLJ"  style={{"left":Math.floor((val - minVal) * (100/(maxVal-minVal)))+"%"}}>
                      <div opacity="1" className="sc-hHlrlp ctdOCm"></div>
                      <div className="sc-lfPQjg zXRTM">{val}x</div>
                    </div>
                  </div>

                )
              })
            }
          </div>
          <input
            type="range"
            min="2"
            max="150"
            step="1"
            className="sc-dvbZAg gGtkSf"
            value={leverageSelected}
            onChange={(e) => setLeverageSelected(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default function TradeOptions({
  fromSymbol,
  handleFromAmount,
  fromAmount,
  toAmount,
  handleToAmount,
  handleSlider,
  slider,
  swapOption,
  futureBalace,
  activeWallet,
  slippage,
  handleSlippage,

  quotePrices,
  changeQuoteType,
  updateBalances,
}) {
  const [anchorPayPopover, setAnchorPayPopover] = useState(null);
  const [anchorPositionSizePopover, setAnchorPositionSizePopover] =
    useState(null);
  const [anchorSlippagePopover, setAnchorSlippagePopover] = useState(null);
  const [customizeSelected, setCustomizeSelected] = useState(false);
  const [isOpen,setIsOpen] = useState(false);

  const [quoteType, setQuoteType] = useState('ETH')
  const [eusdAmount, setEusdAmount] = useState(0)

  useEffect(() => {
    let quotePrice = quotePrices[quoteType.toLowerCase()]
    setEusdAmount(fromAmount * quotePrice)
  }, [fromAmount])

  useEffect(() => {
    updateBalances()
  }, [quoteType])

  useEffect(() => {
    setTimeout(() => {
      handleToAmount(quoteType)
    }, [1000])
  }, [fromSymbol])

  const showFiat =(event)=>{
    setIsOpen(true)
  }
  const handlePayPopoverClick = (event) => {
    setAnchorPayPopover(event.currentTarget);
  };

  useEffect(() => {
    if(fromSymbol === 'BTC' || fromSymbol === 'XRP'){
      handlePayPopoverClose('ETH')
    }else{
      handlePayPopoverClose(fromSymbol)
    }
  }, [fromSymbol])

  const handlePayPopoverClose = (item = undefined) => {
    if (item) {
      let quotePrice = quotePrices[item.toLowerCase()]
      setEusdAmount(fromAmount * quotePrice)
      setQuoteType(item);
      changeQuoteType(item);
      handleToAmount(item);
    }
    setAnchorPayPopover(null);
  };

  const handlePositionSizePopoverClick = (event) => {
    setAnchorPositionSizePopover(event.currentTarget);
  };

  const handlePositionSizePopoverClose = () => {
    setAnchorPositionSizePopover(null);
  };

  const handleSlippagePopoverClick = (event) => {
    setAnchorSlippagePopover(event.currentTarget);
  };

  const handleSlippagePopoverClose = () => {
    setAnchorSlippagePopover(null);
  };

  const payPopoverOpen = Boolean(anchorPayPopover);
  const payPopoverId = payPopoverOpen ? "pay-popover" : undefined;
  const positionSizePopoverOpen = Boolean(anchorPositionSizePopover);
  const positionSizePopoverId = positionSizePopoverOpen
    ? "position-size-popover"
    : undefined;
  const slippagePopoverOpen = Boolean(anchorSlippagePopover);
  const slippagePopoverId = slippagePopoverOpen
    ? "slippage-popover"
    : undefined;

  return (
    <div className="sc-cRkqwB duagfF">
      <FiatRam isOpen={isOpen} closeModal={()=>{setIsOpen(false)}}/>
      <div>
        <div className="sc-kTvvXX ikSIJP">
          <div className="balance">
            Balance:&nbsp;
            {activeWallet &&
              <button >{numberFormat(futureBalace)}</button>
            }
            {activeWallet==false &&
              <button disabled={true}>-</button>
            }
            &nbsp;{quoteType}
          </div>
        </div>
        <div className="sc-fduepK gbELha">
          <div className="sc-kjEcyX jKQNPD">
            <div className="sc-elYLMi gBkBzR">
              <input
                autoComplete="off"
                placeholder="0.0"
                type="text"
                tabIndex="1"
                value={fromAmount}
                onChange={handleFromAmount}
                invalid="false"
              />
              <div className="sc-cLFqLo ffGkrx"></div>
            </div>
          </div>
          <div className="sc-joKenV eLnVSH">
            <div className="sc-cmvVVv hErxMN">
              <div className="sc-bAKPPm ffehc">
                <div
                  className="sc-dvwKko sc-bgA-dc exluuZ dRdxyF"
                  onClick={handlePayPopoverClick}
                >
                  <span className="flex items-center gap-1">
                    <img
                      src={`/assets/image/token/${quoteType}.png`}
                      className="h-[18px]"
                      alt=""
                    />
                    {quoteType}
                  </span>
                  {/* <img
                    src="/assets/image/icon/ic-dropdown.svg"
                    className="sc-jWquRx cwaGZa arrow"
                    alt=""
                    style={{ marginRight: "6px" }}
                  /> */}
                </div>
                  <Popover
                    id={payPopoverId}
                    // open={payPopoverOpen}
                    anchorEl={anchorPayPopover}
                    // onClose={(e) => handlePayPopoverClose()}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <div className="sc-jZiqTT bEERhX sc-PJClH dWVWHG">
                      <label
                        fontSize="16"
                        className={"sc-hAZoDl jWrHsK sc-fEOsli sc-jfdOKL mHzli cPpoCB"}
                        onClick={(e)=>{handlePayPopoverClose(quoteType);}}
                      >
                        {quoteType}
                      </label>  
                      {/* <label
                        fontSize="16"
                        className={"sc-hAZoDl jWrHsK sc-fEOsli sc-jfdOKL mHzli " + (quoteType=='BTC' ? "cPpoCB" : "ebRjjn")}
                        onClick={(e)=>{handlePayPopoverClose('BTC');}}
                      >
                        BTC
                      </label>
                      <label
                        fontSize="16"
                        className={"sc-hAZoDl jWrHsK sc-fEOsli sc-jfdOKL mHzli " + (quoteType=='XRP' ? "cPpoCB" : "ebRjjn")}
                        onClick={(e)=>{handlePayPopoverClose('XRP');}}
                      >
                        XRP
                      </label> */}
                      {/* <label
                        fontSize="16"
                        className={"sc-hAZoDl jWrHsK sc-fEOsli sc-jfdOKL mHzli " + (quoteType=='PEPE' ? "cPpoCB" : "ebRjjn")}
                        onClick={(e)=>{handlePayPopoverClose('PEPE');}}
                      >
                        PEPE
                      </label> */}
                    </div>
                  </Popover>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sc-fduepK gbELh1">
          <div className="sc-kjEcyX jKQNPD">
            <div className="sc-elYLMi gBkBzR">
              <input
                autoComplete="off"
                placeholder="0.0"
                type="text"
                tabIndex="2"
                value={eusdAmount}
                readOnly
                style={{ color: swapOption==0?"rgb(14, 203, 129)":"rgb(228, 62, 83)" }}
              />
              <div className="sc-cLFqLo ffGkrx"></div>
            </div>
          </div>
          <div className="sc-joKenV eLnVSH">
            <div className="sc-cmvVVv hErxMN">
              <div className="sc-bAKPPm ffehc">
                <div
                  className="sc-dvwKko sc-bgA-dc exluuZ dRdxyF"
                  onClick={handlePayPopoverClick}
                >
                  <span className="flex items-center gap-1">
                    <img
                      src="/assets/image/token/USDT.png"
                      className="h-[18px]"
                      alt=""
                    />
                    EUSD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      <div className="sc-IAann bcBuuK"></div>
      <div>
        <div className="sc-kTvvXX ikSIJP">
          <div className="sc-gcFSfr bLAwDl">
            <label fontSize="13" className="sc-hAZoDl bgxyIr sc-fEOsli mHzli">
              Position Size
            </label>
            <div className="sc-dIouRR dhfupG">
              <Tooltip
                title="Size equals leverage times your amount of collateral"
                placement="top"
                arrow
                enterTouchDelay={0}
              >
                <div className="sc-dmRaPn gsoPia"></div>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="sc-fduepK btPoxZ">
          <div className="sc-kjEcyX cjpIDD">
            <div className="sc-elYLMi gBkBzR">
              <input
                autoComplete="off"
                placeholder="0.0"
                type="text"
                tabIndex="2"
                value={toAmount}
                readOnly
                style={{ color: swapOption==0?"rgb(14, 203, 129)":"rgb(228, 62, 83)" }}
                
              />
              <div className="sc-cLFqLo ffGkrx"></div>
            </div>
          </div>
          <div className="sc-joKenV eLnVSH">
            <div className="sc-cmvVVv hErxMN">
              <div
                className="sc-dvwKko exluuZ"
              >
                <span className="flex items-center gap-1 mr-2">
                  <img
                    src={`/assets/image/token/${fromSymbol}.png`}
                    className="h-[18px]"
                    alt=""
                  />
                  {fromSymbol}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LeverageSlider
        customizeSelected={customizeSelected}
        setCustomizeSelected={setCustomizeSelected}
        leverageSelected={slider}
        setLeverageSelected={handleSlider}
        handleSlider={handleSlider}
      />
      <div className="sc-bTUVp LZWhv">
        <div className="sc-ftKnHw clZtuj">
          <label
            fontSize="14"
            color="#b9b9b9"
            className="sc-hAZoDl enTViw sc-fEOsli mHzli"
          >
            Slippage
          </label>
          <div className="sc-dIouRR dhfupG">
            <Tooltip
              title="Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution."
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
            className="sc-hmLeec dhgomc"
            onClick={handleSlippagePopoverClick}
          >
            <div>{slippage}%</div>
            <img
              src="/assets/image/icon/ic-dropdown.svg"
              className="sc-lfiFoR iScHuz"
              alt=""
            />
          </div>
          <Popover
            id={slippagePopoverId}
            open={slippagePopoverOpen}
            anchorEl={anchorSlippagePopover}
            onClose={handleSlippagePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className="sc-jZiqTT jSiRUq sc-hpDagy iQdiam">
              <label
                fontSize="14"
                color="#adabab"
                className="sc-hAZoDl kujPBm sc-fEOsli mHzli"
              >
                Setting slippage
              </label>
              <div className="sc-gspIFj bpDydo">
                <div className="sc-czShuu cIXZrB">
                  <button data-value="0.001" className="sc-gpxMCN iUHVIx" onClick={()=>handleSlippage({target:{value:0.1}})}>
                    0.1%
                  </button>
                  <button data-value="0.003" className="sc-gpxMCN iUHVIx" onClick={()=>handleSlippage({target:{value:0.3}})}>
                    0.3%
                  </button>
                  <button data-value="0.005" className="sc-gpxMCN iUHVIx" onClick={()=>handleSlippage({target:{value:0.5}})}>
                    0.5%
                  </button>
                  <div className="sc-cxalrY feoWgR">
                    <input
                      type="text"
                      placeholder="0.3"
                      pattern="^[0-9.]+$"
                      className="sc-boKtkb dKUrQU"
                      value={slippage}
                      onChange={ (e)=>handleSlippage(e)}
                    />
                    <div className="ratio">
                      <span>%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}
