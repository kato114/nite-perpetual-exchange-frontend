export const EXCHANGE_ABI = [{
    "inputs": [{
        "internalType": "address",
        "name": "_staking",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_trading",
        "type": "address"
    }],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "inputs": [],
    "name": "EUSD",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "WETH",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pairIndex",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_quoteToken",
        "type": "address"
    }],
    "name": "addAvailablePair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "executor",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "executorFee",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_token",
        "type": "address"
    }],
    "name": "getPrice",
    "outputs": [{
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "components": [{
            "internalType": "address",
            "name": "trader",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "pairIndex",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "positionSizeDai",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "openPrice",
            "type": "uint256"
        }, {
            "internalType": "bool",
            "name": "buy",
            "type": "bool"
        }, {
            "internalType": "uint256",
            "name": "leverage",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "tp",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "sl",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "liq",
            "type": "uint256"
        }, {
            "internalType": "address",
            "name": "quoteToken",
            "type": "address"
        }],
        "internalType": "struct ItradingStorage.Trade",
        "name": "t",
        "type": "tuple"
    }, {
        "internalType": "uint256",
        "name": "orderType",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "slippageP",
        "type": "uint256"
    }],
    "name": "openTrade",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "positionFee",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "quoteTokenByPairIndex",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_executor",
        "type": "address"
    }],
    "name": "setExecutor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
    }],
    "name": "setExecutorFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
    }],
    "name": "setPositionFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "stakingI",
    "outputs": [{
        "internalType": "contract IStaking",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "tradingI",
    "outputs": [{
        "internalType": "contract Itrading",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "tradingReceiverI",
    "outputs": [{
        "internalType": "contract ItradingReceiver",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]