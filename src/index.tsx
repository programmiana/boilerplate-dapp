import * as React from "react";
import ReactDOM from "react-dom";
import { Container } from "./container";
import { useEthMetaMask } from "./use-eth-meta-mask";
import { useLoadBlockchainData } from "./use-load-blockchain-data";

const App = () => {
  const eth = useEthMetaMask();
  const data = useLoadBlockchainData(eth);

  console.log(eth);
  if (!eth || !data || (data && !data.accounts)) return <p>Loading...</p>;
  return (
    <Container>
      <p>hello, your account is: {data.accounts[0]}</p>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
