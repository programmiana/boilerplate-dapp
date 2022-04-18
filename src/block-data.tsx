import * as React from "react";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "./container";
import { useMetamask } from "./use-eth-meta-mask";
import { useLoadBlockchainData } from "./use-load-blockchain-data";

const MintButton = styled.button`
  padding: 1rem;
  baground-color: lightgray;
  border: 1px solid rgb(193 160 218);
`;
type BlockDataProps = {
  isConnected: boolean;
};
export const BlockData: FC<BlockDataProps> = () => {
  const data = useLoadBlockchainData();
  const [minted, setMinted] = useState<boolean>(false);

  if (
    !data ||
    (data && !data.networkId) ||
    (data && !data.accounts) ||
    (data && !data.web3)
  )
    return <p>Loading...</p>;

  console.log(data);

  const mint = async () => {
    data.toDoList.methods
      .mint(data.accounts)
      .send({ from: data.accounts })
      .then((tx) => {
        console.log(tx);

        setMinted(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      <p>hello, your account is: {data.accounts}</p>
      {minted ? (
        <div>
          <p>Your Token got minted.</p>
          <MintButton onClick={() => mint()}>Mint me again</MintButton>
        </div>
      ) : (
        <MintButton onClick={() => mint()}>Mint me</MintButton>
      )}
    </Container>
  );
};
