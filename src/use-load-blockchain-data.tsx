import { useEffect, useState } from "react";
import Web3 from "web3";
// import { TO_DO_LIST_ABI, TO_DO_LIST_ADDRESS } from "./config";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import NFTContractBuild from "../truffle/build/contracts/NFT.json";
declare var window: any;
// needed to satisfy ts

export function useLoadBlockchainData() {
  const [networkId, setNetworkId] = useState<number>();
  const [selectedAccount, setSelectedAccount] = useState<string>();
  const [activeContract, setActiveContract] = useState<Contract>();
  // const [mintToken, setMintToken] = useState();
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  useEffect(() => {
    const fetchData = async () => {
      const response = await web3.eth.net.getId();
      console.log(response);
      setNetworkId(response);
    };

    fetchData().catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await web3.eth.getAccounts();
      setSelectedAccount(response[0]);
    };

    fetchData().catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (!networkId) return;

    const fetchData = async () => {
      const contract = new web3.eth.Contract(
        NFTContractBuild.abi as unknown as AbiItem,
        // todo: change for network Id
        NFTContractBuild.networks[networkId].address
      );
      setActiveContract(contract);
    };

    fetchData().catch((e) => console.log(e));
  }, [networkId]);

  const mintToken = () => {
    if (selectedAccount) {
      return activeContract.methods
        .mint(selectedAccount)
        .send({ from: selectedAccount });
    }
  };

  return {
    web3,
    accounts: selectedAccount,
    toDoList: activeContract,
    networkId,
    mintToken,
  };
}
