import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

const projectId = 'a9680cd05c410ced5a6621e943754fc8'

export const [walletConnectV2, hooks] = 
initializeConnector(
(actions) =>
new WalletConnectV2({
  actions,
  options: {
    projectId: projectId,
    chains: [97],
    showQrModal: true,
  },
})
)

const injected = new InjectedConnector({
  supportedChainIds: [97]
});

const RPC_URLS = {
  97:'https://data-seed-prebsc-1-s2.binance.org:8545',
  43113:'https://api.avax-test.network/ext/C/rpc',
  420:'https://goerli.optimism.io',
  421613:'https://goerli-rollup.arbitrum.io/rpc'
}

const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
  bridge: "https://bridge.walletconnect.org",
  pollingInterval: 10000
});

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "web3-react-demo"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};