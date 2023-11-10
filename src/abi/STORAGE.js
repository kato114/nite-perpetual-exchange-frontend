export const STORAGE_ABI=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_trading",
				"type": "address"
			}
		],
		"name": "addTradingContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_trading",
				"type": "address"
			}
		],
		"name": "removeTradingContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_executor",
				"type": "address"
			}
		],
		"name": "setExecutor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxTradesPerPair",
				"type": "uint256"
			}
		],
		"name": "setMaxTradesPerPair",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "trader",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "pairIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "positionSize",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "buy",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "leverage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sl",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "minPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "block",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "openTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"internalType": "struct tideStorage.OpenLimitOrder",
				"name": "o",
				"type": "tuple"
			}
		],
		"name": "storeOpenLimitOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "trader",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "pairIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "positionSizeDai",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "openPrice",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "buy",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "leverage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sl",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "liq",
						"type": "uint256"
					}
				],
				"internalType": "struct tideStorage.Trade",
				"name": "_trade",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "borrowToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "borrowAmount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "positionToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "positionAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "openTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tpLastUpdated",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "slLastUpdated",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "liq",
						"type": "uint256"
					}
				],
				"internalType": "struct tideStorage.TradeInfo",
				"name": "_tradeInfo",
				"type": "tuple"
			}
		],
		"name": "storeTrade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pairIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "unregisterOpenLimitOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pairIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "unregisterTrade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "trader",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "pairIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "positionSize",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "buy",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "leverage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sl",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "minPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "block",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "openTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"internalType": "struct tideStorage.OpenLimitOrder",
				"name": "_o",
				"type": "tuple"
			}
		],
		"name": "updateOpenLimitOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pairIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_newSl",
				"type": "uint256"
			}
		],
		"name": "updateSl",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pairIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_newTp",
				"type": "uint256"
			}
		],
		"name": "updateTp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "executor",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pairIndex",
				"type": "uint256"
			}
		],
		"name": "firstEmptyOpenLimitIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pairIndex",
				"type": "uint256"
			}
		],
		"name": "firstEmptyTradeIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pairIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getOpenLimitOrder",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "trader",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "pairIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "positionSize",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "buy",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "leverage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sl",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "minPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "block",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "openTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"internalType": "struct tideStorage.OpenLimitOrder",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOpenLimitOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "trader",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "pairIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "index",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "positionSize",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "buy",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "leverage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "sl",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "minPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxPrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "block",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "openTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"internalType": "struct tideStorage.OpenLimitOrder[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pairIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "hasOpenLimitOrder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isTradingContract",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSlP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxTradesPerPair",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "openLimitOrderIds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "openLimitOrders",
		"outputs": [
			{
				"internalType": "address",
				"name": "trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pairIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "positionSize",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "buy",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "leverage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sl",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "block",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "openTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "openLimitOrdersCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "openTrades",
		"outputs": [
			{
				"internalType": "address",
				"name": "trader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pairIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "positionSizeDai",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "openPrice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "buy",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "leverage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sl",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "liq",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "openTradesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "openTradesInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "borrowToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "borrowAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "positionToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "positionAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "openTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tpLastUpdated",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "slLastUpdated",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "liq",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pairTraders",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pairTradersId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "traders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "leverageUnlocked",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referral",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "referralRewardsTotal",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tradesPerBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]