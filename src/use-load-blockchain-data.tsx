import { useEffect, useState } from "react";
import Web3 from "web3";
declare var window: any;
// needed for ts

export function useLoadBlockchainData({ eth }) {
  const [network, setNetwork] = useState<string>("");
  const [accounts, setAccounts] = useState<string[]>([]);
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

  useEffect(() => {
    if (eth) {
      web3.eth.net
        .getNetworkType()
        .then((networkType) => setNetwork(networkType));
    }
  }, []);

  useEffect(() => {
    if (eth) {
      web3.eth
        .getAccounts()
        .then((accountNumbers) => setAccounts(accountNumbers));
    }
  }, []);

  return { web3, network, accounts };
}
