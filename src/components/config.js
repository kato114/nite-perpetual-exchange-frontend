const config = {
  walletConnect: "c40d7195e555a905e4ae9ac3534fbd53",
  baseUrl: { local: "https://backend.memex.exchange" },
  sock: { local: "https://socket.memex.exchange" },
  scanUrl: "https://etherscan.io/address/",
  tokenUrl: "https://tokens.coingecko.com/ethereum/all.json",
};

export default function Config() {
  return config;
}
