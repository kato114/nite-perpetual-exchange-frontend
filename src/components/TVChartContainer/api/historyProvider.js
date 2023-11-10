const rp = async(param)=>{}
const api_root = "https://tradingview.fxtradium.asia";
const history = {}

export default {
	history: history,

    getBars: function(symbolInfo, resolution, from, to, first, limit) {

		const url = '/getbars'
		const qs = {
				symbol: symbolInfo.name,
				resolution:resolution,
				from:from,
				to:to,
				limit:limit
			}
        return rp({
                url: `${api_root}${url}`,
                qs,
            })
            .then(bars => {
				if (bars.length) {
					let newbars = [];
					bars.forEach(bar => {
						if (bar.time >= from && bar.time < to) {
							newbars = [...newbars, {
								time: bar.time * 1000,
								low: bar.low,
								high: bar.high,
								open: bar.open,
								close: bar.close,
								volume:bar.volume
							}];
						}
					});
					if (first) {
						var lastBar = bars[bars.length - 1]
						history[symbolInfo.name] = {lastBar: lastBar}
					}
					return newbars
				} else {
					return []
				}
			})
		}
}
