import { useEffect, useState } from "react";
import Web3 from "web3";
declare var window: any;
// needed to satisfy ts

export function useMetamask() {
  const [eth, setEth] = useState<boolean>(false);
  const [web3Provider, setWeb3Provider] = useState<any>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<string>();

  useEffect(() => {
    if (window.ethereum) {
      console.log("metamask is installed");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setEth(true);
          console.log(accounts);
          window.ethereum.on("accountsChanged", function (accounts) {
            setSelectedAccount(accounts[0]);
            console.log(`selected account changed to ${selectedAccount}`);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      setWeb3Provider(new Web3(window.ethereum));
    }
  }, []);

  useEffect(() => {
    if (window.ethereum.isConnected()) {
      setConnected(true);
    }
  }, []);

  return { eth, connected, web3Provider, selectedAccount };
}
