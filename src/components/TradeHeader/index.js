import { useState } from "react";
import {toFixed,getBigNumber,timeConverter, numberFormat, truncateAddress} from "../utils";
import { Popover } from "@mui/material";

import "./TradeHeader.css";

export default function TradeHeader({aniOldPrice,aniCurPrice,
bscdecimals,handleTradingview,fromSymbol,pairName,tokens,handleToken,extraListInfo,changeLoaded,close,high,low,change,change_amount,volume,volume_quote,upprice}) {
  const [anchorPairPopover, setAnchorPairPopover] = useState(null);

  const handlePairPopoverClick = (event) => {
    setAnchorPairPopover(event.currentTarget);
  };

  const handlePairPopoverClose = () => {
    setAnchorPairPopover(null);
  };

  const pairPopoverOpen = Boolean(anchorPairPopover);
  const pairPopoverId = pairPopoverOpen ? "pair-popover" : undefined;

  return (
    <div className="sc-cMlSiz jwPOhI">
      <div className="sc-gvcUpg bCula">
        <div className="sc-jvTWZz iAWhff">
          <div className="sc-bAKPPm ffehc">
            <div className="sc-DwwCV eyPLjD" onClick={handlePairPopoverClick}>
              <span className="flex items-center mr-2">
                <img
                  src={`/assets/image/token/${fromSymbol}.png`}
                  className="h-[24px]"
                  alt=""
                />
                {pairName}
              </span>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L4.14133 3.93973C4.12278 3.95884 4.10075 3.97399 4.0765 3.98434C4.05225 3.99468 4.02625 4 4 4C3.97375 4 3.94775 3.99468 3.9235 3.98434C3.89925 3.97399 3.87722 3.95884 3.85867 3.93973L1 1" stroke="#E8E8E9" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Popover
              id={pairPopoverId}
              open={pairPopoverOpen}
              anchorEl={anchorPairPopover}
              onClose={handlePairPopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <div className="sc-jZiqTT bQHNjJ sc-fLPJQD lkoPif">
                <div className="sc-fwZfOe dBXfyS">
                  <div className="sc-eyHTTJ UbTRX">
                    <div className="sc-ejRpRk jpfPUy">Pair</div>
                    <div className="sc-ejRpRk jpfPUy">Last Price</div>
                    <div className="sc-ejRpRk jpfPUy">24h Change</div>
                  </div>
                  <div>
                    {Object.keys(tokens).map((i)=>{
                      return (

                        <button key={i.toString()} data-address={tokens[i].pair} className="sc-fsyvLD kQRwWw"
                          onClick={()=>{handleToken(tokens[i].address, tokens[i].pair, tokens[i].symbol,tokens[i].pairIndex);handlePairPopoverClose();}}
                        >
                          <div color="#fff" className="sc-fVmPpc iTWoNv">
                            {tokens[i].pair}
                          </div>
                          <div className="sc-fVmPpc iTWoNv">{extraListInfo(tokens[i].address).price}</div>
                          <div className={'sc-fVmPpc buCcJE '+(extraListInfo(tokens[i].address).positive ? 'positive' : 'negative')}>
                            {extraListInfo(tokens[i].address).change}
                          </div>
                        </button>
                      )})
                    }
                  </div>
                </div>
              </div>
            </Popover>
          </div>
          <div className="sc-hIkKma sc-dyoGmK lgVvUD dtGvpf">
            <div className="sc-gJTyrF sc-gTeHfO fQWZJN czRSO">Price</div>
            <div className="sc-hVABYF dtdrkw">
              <div className={"sc-hhVlin lnvCpw "+(aniCurPrice>aniOldPrice?"positive":"negative")}>
                ${changeLoaded?numberFormat(aniCurPrice,bscdecimals):'-'}
                <div className="sc-hXbooz uehQg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="sc-bXVllQ cfeSUs">
          <div className="sc-hIkKma lgVvUD">
            <div className="sc-gJTyrF fQWZJN">24h Change</div>
            <div className="sc-hVABYF dtdrkw">
              <div color="#0dcb81" className={"sc-fJAkKG ftWnCp "+((changeLoaded && Number(change)<0) ? 'negative' : 'positive')}>
                ${changeLoaded?numberFormat(change_amount,bscdecimals):'-'}
              </div>
              &nbsp;&nbsp;
              <div color="#0dcb81" className={"sc-fJAkKG ftWnCp "+((changeLoaded && Number(change)<0) ? 'negative' : 'positive')}>
                {changeLoaded?change:'-'}%
              </div>
            </div>
          </div>
          <div className="sc-hIkKma lgVvUD">
            <div className="sc-gJTyrF fQWZJN">24h High</div>
            <div className="sc-hVABYF dtdrkw">
              <div className="sc-fJAkKG gIZyqv">${changeLoaded?numberFormat(high,bscdecimals):'-'}</div>
            </div>
          </div>
          <div className="sc-hIkKma lgVvUD">
            <div className="sc-gJTyrF fQWZJN">24h Low</div>
            <div className="sc-hVABYF dtdrkw">
              <div className="sc-fJAkKG gIZyqv">${changeLoaded?numberFormat(low,bscdecimals):'-'}</div>
            </div>
          </div>

          <div className="sc-hIkKma lgVvUD volume hiddenMobile">
            <div className="sc-gJTyrF fQWZJN">24h Volume ({fromSymbol})</div>
            <div className="sc-hVABYF dtdrkw">
              <div className="sc-fJAkKG gIZyqv">{changeLoaded?numberFormat(volume):'-'}</div>
            </div>
          </div>
          <div className="sc-hIkKma lgVvUD volume hiddenMobile">
            <div className="sc-gJTyrF fQWZJN">24h Volume (USD)</div>
            <div className="sc-hVABYF dtdrkw">
              <div className="sc-fJAkKG gIZyqv">${changeLoaded?numberFormat(volume_quote):'-'}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
