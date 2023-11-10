import * as React from "react";
import "./index.css";
import { widget } from "../../charting_library";
import datafeed from "./api/index";
function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export class TVChartContainer extends React.PureComponent {
  static defaultProps = {
    symbol: "AAPL",
    interval: "60",
    datafeedUrl: "https://demo_feed.tradingview.com",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  tvWidget = null;

  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }
  componentDidUpdate() {
    this.tvWidget?.setSymbol(this.props.symbol, 60, null);
  }
  componentDidMount() {
    const widgetOptions = {
      symbol: this.props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: datafeed,
      interval: this.props.interval,
      container: this.ref.current,
      library_path: this.props.libraryPath,
      locale: getLanguageFromURL() || "en",
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
        "header_compare",
        "header_undo_redo",
        "header_screenshot",
        "header_fullscreen_button",
        "header_settings",
        "header_saveload",
      ],
      enabled_features: ["hide_left_toolbar_by_default"],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      toolbar_bg: "transparent",
      theme: "dark",
      custom_css_url: "../themed.css",
      overrides: {
        "paneProperties.background": "#0c0c12",
        "paneProperties.backgroundType": "solid",
        "mainSeriesProperties.candleStyle.downColor": "#c83251",
        "mainSeriesProperties.candleStyle.borderDownColor": "#c83251",
        "mainSeriesProperties.candleStyle.upColor": "#2acf81",
        "mainSeriesProperties.candleStyle.borderUpColor": "#2acf81",
        loading_screen: {
          backgroundColor: "transparent",
        },
      },
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        this.props.chartLoaded();
      });
    });
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return <div ref={this.ref} className={"TVChartContainer"} />;
  }
}
