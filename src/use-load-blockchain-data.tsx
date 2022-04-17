import { useEffect, useState } from "react";
import Web3 from "web3";

export function useLoadBlockchainData({ eth }) {
  const [network, setNetwork] = useState<string>("");
  const [accounts, setAccounts] = useState<string[]>([]);
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

  if (!eth) return false;

  useEffect(() => {
    web3.eth.net
      .getNetworkType()
      .then((networkType) => setNetwork(networkType));
  }, []);

  useEffect(() => {
    web3.eth
      .getAccounts()
      .then((accountNumbers) => setAccounts(accountNumbers));
  }, []);

  return { web3, network, accounts };
}
