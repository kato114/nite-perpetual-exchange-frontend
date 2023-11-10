export const EXECUTOR_FEE = "10000000000000000";
export const TRADING_FEE=0.0035;
export const TIDEPOSITION_ADDRESS = "0xAf3900e7Dd068d0d7a368B3440F21554c52323b2";
export const STORAGE_ADDRESS= "0x5284C8C73FAb05Df45f3C6e034ff878dC3989bcF";
export const STAKE_ADDRESS = "0x5BC7C1Cde94ddAD81A856FbA5592aC1e088FceE1";
export const EXCHANGE_ADDRESS = "0x3d7CB643DF593239B44Be986959c91B246bC2599";
export const MAXLIQ = 0.03;
export const COLLRATERAL_MIN = 30;
export const COLLRATERAL_MAX = 10000;
export const USDT_PRECISION = 18;
export const USDT_PRECISION_OMNICHAIN=18;
export const INTEREST_PRECISION=6;

export const USDT_ADDRESS = "0x6256976040B06BE5652d02Ce1F8956145CF08Cc8";
export const MAX_TRADES_PER_PAIR=3;
// export const MARKET_ADDRESS = "0xBbb5d0Fdb132174CC993207907ce6cf62AFA1F92";
// export const LIMIT_ADDRESS = "0xbd120e7BaD2b62efEEDc234775A504B23BC8C76b";
export const BSCRPCURL = "https://data-seed-prebsc-1-s2.binance.org:8545";
export const TOKENCONVERTOR = {
	["0x6256976040B06BE5652d02Ce1F8956145CF08Cc8"]:{//USDT
		[97]:"0x6256976040B06BE5652d02Ce1F8956145CF08Cc8",
		[43113]:"0xDbCCe099619D10296b78eDCaAb7a342F57E48812",
		[421613]:"0x23502F3E8557a170FbD90dB2Fa3abe89D0651aFB",
		[420]:"0xd646457233D428121A40762f0e4EDDF51536e781"
	},
	["0xe61795f4E3948d3db57346771385ca12a0fF90b5"]:{//btc
		[97]:"0xe61795f4E3948d3db57346771385ca12a0fF90b5",
		[43113]:"0x5a84fe21dC832Ad8Fec412e368c842fCf13eB8FE"
	},
	["0x965cAac30aFE710aB1119072ED9E25a49B0a5231"]:{//eth
		[97]:"0x965cAac30aFE710aB1119072ED9E25a49B0a5231",
		[43113]:"0x257E9FfBC3805676E21d5A6FB19c08ec3eC2F7ED"
	},
	["0x6d632D80948E3db0fD3fdb383A8A2A831d186735"]:{//xrp
		[97]:"0x6d632D80948E3db0fD3fdb383A8A2A831d186735",
		[43113]:"0xb308d1334AAdB45dAC7ceAb10cbA9fe8385D59ea"
	},
	["0xE4a2F16Dd06a130bA25364F60E4661BC1f2728E1"]:{//PEPE
		[97]:"0xE4a2F16Dd06a130bA25364F60E4661BC1f2728E1",
	},
	["0x7cBB0Efe2E8910cCc224c4eba73Aac92489C80D6"]:{//Emoti
		[97]:"0x7cBB0Efe2E8910cCc224c4eba73Aac92489C80D6",
	},
}
export const MARKET_ADDRESS_LIST ={
	[97]:"0xBbb5d0Fdb132174CC993207907ce6cf62AFA1F92",
	[43113]:"0x7155669C7b2438a4B1f7635E73234235b4016Db0"
}
export const LIMIT_ADDRESS_LIST ={
	[97]:"0xbd120e7BaD2b62efEEDc234775A504B23BC8C76b",
	[43113]:"0x7009Cc7333E7c3E6aA6ebA33414733eb04126911"
}

export const chainTitle ={
	[97]:"BNB chain [Test]",
	[43113]:"Fuji [C-Chain]",
	[421613]:"Arbitrum-Goerli [Test]",
	[420]:"Optimism-Goerli [Test]",
}

export const chainData ={
	[97]:{
		chainName:'BNB chain [Test]',
		nativeCurrency:{ name: 'Binance Token', decimals: 18, symbol: 'BNB' },
		rpcUrls:['https://data-seed-prebsc-1-s2.binance.org:8545']
	},
	[43113]:{
		chainName:'Fuji [C-Chain]',
		nativeCurrency:{ name: 'Avax Token', decimals: 18, symbol: 'AVAX' },
		rpcUrls:['https://api.avax-test.network/ext/C/rpc']
	},
	[421613]:{
		chainName:'Arbitrum-Goerli [Test]',
		nativeCurrency:{ name: 'GoerliETH Token', decimals: 18, symbol: 'ETH' },
		rpcUrls:['https://goerli-rollup.arbitrum.io/rpc']
	},
	[420]:{
		chainName:'Optimism-Goerli [Test]',
		nativeCurrency:{ name: 'Optimism-Goerli Token', decimals: 18, symbol: 'ETH' },
		rpcUrls:['https://goerli.optimism.io']
	},
}

export const tokenForPair ={
	[0]:"eth",
	[1]:"eth",
	[2]:"eth",
	[3]:"pepe",
}

export const tokenAddressForPair ={
	[3]:"0xE4a2F16Dd06a130bA25364F60E4661BC1f2728E1",
}

export const TOKEN_ADDRESS_LIST = {
	['BTC']:"0xe61795f4E3948d3db57346771385ca12a0fF90b5",
	['XRP']:"0x6d632D80948E3db0fD3fdb383A8A2A831d186735",
	['PEPE']:"0xE4a2F16Dd06a130bA25364F60E4661BC1f2728E1",
}

export const USDT_ADDRESS_LIST = {
	[97]:"0x6256976040B06BE5652d02Ce1F8956145CF08Cc8",
	[43113]:"0xDbCCe099619D10296b78eDCaAb7a342F57E48812",
	[421613]:"0x23502F3E8557a170FbD90dB2Fa3abe89D0651aFB",
	[420]:"0xd646457233D428121A40762f0e4EDDF51536e781",
}

export const TRADING_ADDRESS_LIST = {
	[97]:"0x1A95f01774Bd63Bf3AFEE089d0f7283f0299F915",
	[43113]:"0xF7A7fbF4EdD64C9D0d8fF1149c1229cd38b2A261",
	[421613]:"0xAe746f50a2828599eF11F078ddd391CFCA450f97",
	[420]:"0x30e03140394ac365af80dda18c0964a9450e6a3e",
}

export const ZEROLAYER_ENDPOINT_LIST = {
	[97]:"0x54546c53f0A7E218Fa762d04364aAB536De1fD7e",
	[43113]:"0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
	[421613]:"0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
	[420]:"0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
}

export const EXPLORER_LIST = {
	[97]:'https://testnet.bscscan.com',
	[43113]:"https://testnet.snowtrace.io/",
	[421613]:"https://goerli-rollup-explorer.arbitrum.io/",
	[420]:"https://goerli-optimism.etherscan.io/",
	
}

export const ZEROLAYER_CHAINID_LIST = {
	[97]:10102,		//bnb
	[43113]:10106,	//fuji
	[421613]:10143,	//arbitrum
	[420]:10132,	// optimas
	
}