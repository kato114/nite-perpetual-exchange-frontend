import historyProvider from './historyProvider'

import {getLastBar,getExchangeServerTime,getBars,resolveSymbol} from "./apis.js"


const supportedResolutions = ["1", "5", "15", "30", "60", "240", "1D","1W","1M"]
const symbols_types = ["Crypto"];
const configurationData = {
};
const config = {
	supports_marks: false,
	supports_timescale_marks: false,
	supports_time: true,
	supported_resolutions:supportedResolutions
}; 

const lastBarsCache = new Map();
const globalRealtimeUpdator={};

const updateLastBar = async()=>{
	if(globalRealtimeUpdator.symbolInfo){
		const bar = await getLastBar(globalRealtimeUpdator.symbolInfo.name,globalRealtimeUpdator.resolution);		
		globalRealtimeUpdator.onRealtimeCallback(bar);
	}
	setTimeout(updateLastBar,2000);
}
updateLastBar();
export default {
	onReady: cb => {
		setTimeout(() => cb(config), 0)
		
	},
	resolveSymbol:resolveSymbol,
	getBars:getBars,

	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		globalRealtimeUpdator.onRealtimeCallback = onRealtimeCallback;
		globalRealtimeUpdator.symbolInfo = symbolInfo;
		globalRealtimeUpdator.resolution = resolution;
		
	},
	unsubscribeBars: subscriberUID => {
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
	},
	getServerTime: cb => {
		getExchangeServerTime().then(time => {
			cb(Math.floor(time / 1000))
		}).catch(err => {
			console.error(err)
		})
	}
}
