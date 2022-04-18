import * as React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import { BlockData } from "./block-data";
import { Container } from "./container";
import { useMetamask } from "./use-eth-meta-mask";

const App = () => {
  const metaMask = useMetamask();

  if (!metaMask) {
    return (
      <Container>
        <p>Please install metamask to proceed.</p>;
      </Container>
    );
  }

  if (!metaMask.web3Provider) return <p>Loading web 3 provider...</p>;
  console.log(metaMask.web3Provider);

  return (
    <Container>
      <BlockData isConnected={true} />
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
