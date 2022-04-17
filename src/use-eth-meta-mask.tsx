import { useEffect, useState } from "react";
import Web3 from "web3";
declare var window: any;
// needed for ts

export function useEthMetaMask() {
  const [eth, setEth] = useState<boolean>(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      setEth(true);
    }
  }, []);

  return { eth };
}
