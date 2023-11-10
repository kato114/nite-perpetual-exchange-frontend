export const TRADING_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "_staking",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "_trading",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "_lzEndpoint",
    "type": "address"
  }],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint16",
    "name": "_srcChainId",
    "type": "uint16"
  }, {
    "indexed": false,
    "internalType": "bytes",
    "name": "_srcAddress",
    "type": "bytes"
  }, {
    "indexed": false,
    "internalType": "uint64",
    "name": "_nonce",
    "type": "uint64"
  }, {
    "indexed": false,
    "internalType": "bytes",
    "name": "_payload",
    "type": "bytes"
  }, {
    "indexed": false,
    "internalType": "bytes",
    "name": "_reason",
    "type": "bytes"
  }],
  "name": "MessageFailed",
  "type": "event"
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
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint16",
    "name": "_srcChainId",
    "type": "uint16"
  }, {
    "indexed": false,
    "internalType": "bytes",
    "name": "_srcAddress",
    "type": "bytes"
  }, {
    "indexed": false,
    "internalType": "uint64",
    "name": "_nonce",
    "type": "uint64"
  }, {
    "indexed": false,
    "internalType": "bytes32",
    "name": "_payloadHash",
    "type": "bytes32"
  }],
  "name": "RetryMessageSuccess",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint16",
    "name": "_dstChainId",
    "type": "uint16"
  }, {
    "indexed": false,
    "internalType": "uint16",
    "name": "_type",
    "type": "uint16"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "_minDstGas",
    "type": "uint256"
  }],
  "name": "SetMinDstGas",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "precrime",
    "type": "address"
  }],
  "name": "SetPrecrime",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint16",
    "name": "_remoteChainId",
    "type": "uint16"
  }, {
    "indexed": false,
    "internalType": "bytes",
    "name": "_path",
    "type": "bytes"
  }],
  "name": "SetTrustedRemote",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint16",
    "name": "_remoteChainId",
    "type": "uint16"
  }, {
    "indexed": false,
    "internalType": "bytes",
    "name": "_remoteAddress",
    "type": "bytes"
  }],
  "name": "SetTrustedRemoteAddress",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "trader",
    "type": "address"
  }, {
    "components": [{
      "internalType": "uint256",
      "name": "cmd",
      "type": "uint256"
    }, {
      "internalType": "address",
      "name": "sender",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "orderType",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "slippageP",
      "type": "uint256"
    }, {
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
      }],
      "internalType": "struct ItradingStorage.Trade",
      "name": "t",
      "type": "tuple"
    }],
    "indexed": false,
    "internalType": "struct tradingReceiver.tradingcmd",
    "name": "info",
    "type": "tuple"
  }],
  "name": "callinfo",
  "type": "event"
}, {
  "inputs": [],
  "name": "DEFAULT_PAYLOAD_SIZE_LIMIT",
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
    "name": "pairIndex",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }],
  "name": "cancelOrder",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "pairIndex",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "slippageP",
    "type": "uint256"
  }],
  "name": "closeTradeByUser",
  "outputs": [],
  "stateMutability": "nonpayable",
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
    "internalType": "uint16",
    "name": "",
    "type": "uint16"
  }, {
    "internalType": "bytes",
    "name": "",
    "type": "bytes"
  }, {
    "internalType": "uint64",
    "name": "",
    "type": "uint64"
  }],
  "name": "failedMessages",
  "outputs": [{
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_srcChainId",
    "type": "uint16"
  }, {
    "internalType": "bytes",
    "name": "_srcAddress",
    "type": "bytes"
  }],
  "name": "forceResumeReceive",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_version",
    "type": "uint16"
  }, {
    "internalType": "uint16",
    "name": "_chainId",
    "type": "uint16"
  }, {
    "internalType": "address",
    "name": "",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "_configType",
    "type": "uint256"
  }],
  "name": "getConfig",
  "outputs": [{
    "internalType": "bytes",
    "name": "",
    "type": "bytes"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_remoteChainId",
    "type": "uint16"
  }],
  "name": "getTrustedRemoteAddress",
  "outputs": [{
    "internalType": "bytes",
    "name": "",
    "type": "bytes"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_srcChainId",
    "type": "uint16"
  }, {
    "internalType": "bytes",
    "name": "_srcAddress",
    "type": "bytes"
  }],
  "name": "isTrustedRemote",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "lzEndpoint",
  "outputs": [{
    "internalType": "contract ILayerZeroEndpoint",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_srcChainId",
    "type": "uint16"
  }, {
    "internalType": "bytes",
    "name": "_srcAddress",
    "type": "bytes"
  }, {
    "internalType": "uint64",
    "name": "_nonce",
    "type": "uint64"
  }, {
    "internalType": "bytes",
    "name": "_payload",
    "type": "bytes"
  }],
  "name": "lzReceive",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "maxPairIndex",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "",
    "type": "uint16"
  }, {
    "internalType": "uint16",
    "name": "",
    "type": "uint16"
  }],
  "name": "minDstGasLookup",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_srcChainId",
    "type": "uint16"
  }, {
    "internalType": "bytes",
    "name": "_srcAddress",
    "type": "bytes"
  }, {
    "internalType": "uint64",
    "name": "_nonce",
    "type": "uint64"
  }, {
    "internalType": "bytes",
    "name": "_payload",
    "type": "bytes"
  }],
  "name": "nonblockingLzReceive",
  "outputs": [],
  "stateMutability": "nonpayable",
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
  "inputs": [{
    "internalType": "uint16",
    "name": "",
    "type": "uint16"
  }],
  "name": "payloadSizeLimitLookup",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "payout",
  "outputs": [{
    "internalType": "bool",
    "name": "res",
    "type": "bool"
  }],
  "stateMutability": "nonpayable",
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
  "inputs": [],
  "name": "precrime",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_srcChainId",
    "type": "uint16"
  }, {
    "internalType": "bytes",
    "name": "_srcAddress",
    "type": "bytes"
  }, {
    "internalType": "uint64",
    "name": "_nonce",
    "type": "uint64"
  }, {
    "internalType": "bytes",
    "name": "_payload",
    "type": "bytes"
  }],
  "name": "retryMessage",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_version",
    "type": "uint16"
  }, {
    "internalType": "uint16",
    "name": "_chainId",
    "type": "uint16"
  }, {
    "internalType": "uint256",
    "name": "_configType",
    "type": "uint256"
  }, {
    "internalType": "bytes",
    "name": "_config",
    "type": "bytes"
  }],
  "name": "setConfig",
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
    "internalType": "address",
    "name": "_staking",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "_trading",
    "type": "address"
  }],
  "name": "setExternal",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_dstChainId",
    "type": "uint16"
  }, {
    "internalType": "uint16",
    "name": "_packetType",
    "type": "uint16"
  }, {
    "internalType": "uint256",
    "name": "_minGas",
    "type": "uint256"
  }],
  "name": "setMinDstGas",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_dstChainId",
    "type": "uint16"
  }, {
    "internalType": "uint256",
    "name": "_size",
    "type": "uint256"
  }],
  "name": "setPayloadSizeLimit",
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
  "inputs": [{
    "internalType": "address",
    "name": "_precrime",
    "type": "address"
  }],
  "name": "setPrecrime",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_version",
    "type": "uint16"
  }],
  "name": "setReceiveVersion",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_version",
    "type": "uint16"
  }],
  "name": "setSendVersion",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_srcChainId",
    "type": "uint16"
  }, {
    "internalType": "bytes",
    "name": "_path",
    "type": "bytes"
  }],
  "name": "setTrustedRemote",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "_remoteChainId",
    "type": "uint16"
  }, {
    "internalType": "bytes",
    "name": "_remoteAddress",
    "type": "bytes"
  }],
  "name": "setTrustedRemoteAddress",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "mi",
    "type": "uint256"
  }],
  "name": "setmaxPairIndex",
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
  "name": "storetradingCmd",
  "outputs": [{
    "internalType": "uint256",
    "name": "cmd",
    "type": "uint256"
  }, {
    "internalType": "address",
    "name": "sender",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "orderType",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "slippageP",
    "type": "uint256"
  }, {
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
    }],
    "internalType": "struct ItradingStorage.Trade",
    "name": "t",
    "type": "tuple"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "tradingI",
  "outputs": [{
    "internalType": "contract ItradingPosition",
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
}, {
  "inputs": [{
    "internalType": "uint16",
    "name": "",
    "type": "uint16"
  }],
  "name": "trustedRemoteLookup",
  "outputs": [{
    "internalType": "bytes",
    "name": "",
    "type": "bytes"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "pairIndex",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "newSl",
    "type": "uint256"
  }],
  "name": "updateSl",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "pairIndex",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "newTp",
    "type": "uint256"
  }],
  "name": "updateTp",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "_token",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "withdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "stateMutability": "payable",
  "type": "receive"
}]