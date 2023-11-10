import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { TVChartContainer } from "../TVChartContainer/index";

import "./TradeCenter.css";

export default function TradeCenter({ pairName, chartLoaded }) {
  return (
    <div className="sc-ijuBCs hVRUIY">
      <div className="sc-jfRwit hHBTTS">
        <div className="sc-ZyMtA jhjWGE">
          <div className="sc-eUOjGL jAsbcL">
            <div id="chart-container">
              <TVChartContainer
                symbol={pairName}
                theme={"dark"}
                chartLoaded={chartLoaded}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <div
          className=""
          style={{
            position: "absolute",
            userSelect: "none",
            width: "100%",
            height: "10px",
            left: "0px",
            cursor: "row-resize",
            bottom: "0px",
          }}
        >
          <div className="sc-bvdFzt gtdBQQ"></div>
        </div>
      </div> */}
    </div>
  );
}
