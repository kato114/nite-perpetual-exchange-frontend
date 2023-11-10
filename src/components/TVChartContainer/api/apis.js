import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
const intervals = {
    '1': '1m',
    '3': '3m',
    '5': '5m',
    '15': '15m',
    '30': '30m',
    '60': '1h',
    '120': '2h',
    '240': '4h',
    '360': '6h',
    '480': '8h',
    '720': '12h',
    'D': '1d',
    '1D': '1d',
    '3D': '3d',
    'W': '1w',
    '1W': '1w',
    'M': '1M',
    '1M': '1M',
}

const cgIntervals = {
    '1' : '1',
    '5' : '5',
    '30' : '15',
    '60' : '1',
    '120' : '4',
    '1W' : '1',
}

const configurationData = {
    supported_resolutions: ['1','5','15','30', '60','1D', '1W', '1M']
};

function request(url, params = {}) {
    return axios({
        baseURL: 'https://api.binance.com/api/v3',
        method: 'get',
        url,
        params
    })
    .then(res => res.data)
    .catch(res => console.log(res))
}
const getLastBar = async(symbol,interval)=>{
    if(symbol !== "EmotiUSDT"){
        interval = intervals[interval] // set interval
        const res = await request('/klines', { symbol: symbol.toUpperCase(), interval, limit:1 });
        const bar = {
            time:res[res.length-1][0],
            open:res[res.length-1][1],
            high:res[res.length-1][2],
            low:res[res.length-1][3],
            close:res[res.length-1][4],
            volume:res[res.length-1][5]
        }       
        return bar
    }else{
        let aggregate;
        if(interval == "1" || interval === "5" || interval === "30"){
            aggregate = "minute"
            interval = cgIntervals[interval]
        }else if(interval === "60" || interval === "120" ){
            aggregate = "hour"
            interval = cgIntervals[interval]
        }else{
            aggregate = "day"
            interval = cgIntervals[interval]
        }
        const url = 'https://api.geckoterminal.com/api/v2/networks/eth/pools/0xffFa78c979C2F787B16eaC7C7e9c77b11fEb77FB/ohlcv/' + aggregate + '?aggregate=' + interval + '&before_timestamp=' + (Date.now()/1000).toFixed(0) + '&limit=' + '1' + '&currency=usd&token=base'
        fetch(url)
        .then(response=> response.json())
        .then(data => {
            console.log("fetch data length:===", data.data.attributes.ohlcv_list, data.data.attributes.ohlcv_list.length)
                return({
                    time:data.data.attributes.ohlcv_list[data.data.attributes.ohlcv_list.length-1][0] * 1000,
                    open:data.data.attributes.ohlcv_list[data.data.attributes.ohlcv_list.length-1][1],
                    high:data.data.attributes.ohlcv_list[data.data.attributes.ohlcv_list.length-1][2],
                    low:data.data.attributes.ohlcv_list[data.data.attributes.ohlcv_list.length-1][3],
                    close:data.data.attributes.ohlcv_list[data.data.attributes.ohlcv_list.length-1][4],
                    volume:data.data.attributes.ohlcv_list[data.data.attributes.ohlcv_list.length-1][5]
            })
        })
        .catch(error => {
            // Handle errors here
            console.error('Error fetching token data:', error);
        });
    }
}
const getExchangeServerTime = () => request('/time').then(res => res.serverTime);
const getSymbols = () => request('/exchangeInfo').then(res => res.symbols);
const resolveSymbol = async(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        symbolName = symbolName.replace("USD","USDT")
        

        // need for pricescale()
        function pricescale(symbol) {
            for (let filter of symbol.filters) {
                if (filter.filterType == 'PRICE_FILTER') {
                    return Math.round(1 / parseFloat(filter.tickSize))
                }
            }
            return 1
        }

        const symbolInfo = (symbol) => ({
            name: symbol.symbol,
            description: symbol.baseAsset + ' /USD',
            ticker: symbol.symbol,
            session: '24x7',
            minmov: 1,
            pricescale: pricescale(symbol), //  or 100
            timezone: 'UTC',
            has_intraday: true,
            has_daily: true,
            has_weekly_and_monthly: true,
            currency_code: symbol.quoteAsset
        })

        // Get symbols
        if(symbolName != "EmotiUSDT"){
            getSymbols().then(symbols => {
                const symbol = symbols.find(i => i.symbol == symbolName)
                return symbol ? onSymbolResolvedCallback(symbolInfo(symbol)) : onResolveErrorCallback('[resolveSymbol]: symbol not found')
            })
        }else{
            onSymbolResolvedCallback({
                name: "EmotiUSDT",
                description: 'Emoti /USD',
                ticker: "EmotiUSDT",
                session: '24x7',
                minmov: 0.00000001,
                pricescale: 1, //  or 100
                timezone: 'UTC',
                has_intraday: true,
                has_daily: true,
                has_weekly_and_monthly: true,
                currency_code: "USDT"
            })
        }

    }
const getKlines = async ({ symbol, interval, from, to }) => {
    let cgInterval = interval;
    let aggregate;
    interval = intervals[interval] // set interval
    
    from *= 1000
    to *= 1000

    if(symbol != "EmotiUSDT"){
        const res = await request('/klines', { symbol: symbol.toUpperCase(), interval, startTime: from, endTime: to });
        return res.map(i => ({
            time: parseFloat(i[0]),
            open: parseFloat(i[1]),
            high: parseFloat(i[2]),
            low: parseFloat(i[3]),
            close: parseFloat(i[4]),
            volume: parseFloat(i[5]),
        }));
    }else{
        let limit = (to - from) / (cgInterval*1000);
        if(cgInterval == "1" || cgInterval === "5" || cgInterval === "30"){
            aggregate = "minute"
            cgInterval = cgIntervals[cgInterval]
            limit = limit / 60
        }else if(cgInterval === "60" || cgInterval === "120" ){
            aggregate = "hour"
            cgInterval = cgIntervals[cgInterval]
            limit = limit / 60
        }else{
            aggregate = "day"
            cgInterval = cgIntervals[cgInterval]
            limit = limit / 86400
        }
        const url = 'https://api.geckoterminal.com/api/v2/networks/eth/pools/0xffFa78c979C2F787B16eaC7C7e9c77b11fEb77FB/ohlcv/' + aggregate + '?aggregate=' + cgInterval + '&before_timestamp=' + to + '&limit=' + limit.toFixed(0) + '&currency=usd&token=base'
        try {
            const response = await fetch(url);
            const data = await response.json();
            let result = []
            data.data.attributes.ohlcv_list.toReversed().map(i_1 => {
                result.push({
                    time: parseFloat(i_1[0]) * 1000,
                    open: parseFloat(i_1[1]),
                    high: parseFloat(i_1[2]),
                    low: parseFloat(i_1[3]),
                    close: parseFloat(i_1[4]),
                    volume: parseFloat(i_1[5]),
                });
            });
            while (result.length < limit) {
                let last = result.at(result.length-1)
                result.push({
                    time: last.time - 3600,
                    open: 0,
                    high: 0,
                    low: 0,
                    close: 0,
                    volume: 0,
                })
            }
            return result;
        } catch (error) {
            // Handle errors here
            console.error('Error fetching token data:', error);
        }


    }
}
const checkInterval = (interval) => !!intervals[interval]
const getBars = async (symbolInfo, interval, periodParams, onHistoryCallback, onErrorCallback) => {
        if (!checkInterval(interval)) {
            return onErrorCallback('[getBars] Invalid interval')
        }

        const klines = await getKlines({ symbol: symbolInfo.name, interval, from: periodParams.from, to: periodParams.to })
        if(klines.length==0){
            return onHistoryCallback([], {
                noData: true,
            });
            
        }else{
            return onHistoryCallback(klines)
        }
    }
export { getLastBar,getExchangeServerTime,getBars,resolveSymbol}
