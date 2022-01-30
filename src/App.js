import React, { useState } from "react";
import { airDropHelper } from "./helper/airDrop.helper";
import { walletConnectionHelper } from "./helper/walletConnection.helper";

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState();

  return (
    <div>
      <h1>Create your own token using JavaScript</h1>
      {walletConnected && (
        <p>
          <strong>Public Key:</strong> {provider.publicKey.toString()}
        </p>
      )}
      <button
        onClick={() =>
          walletConnectionHelper(
            setProvider,
            walletConnected,
            setWalletConnected
          )
        }
        disabled={loading}
      >
        {!walletConnected ? "Connect Wallet" : "Disconnect Wallet"}
      </button>

      {walletConnected && (
        <p>
          Airdrop 1 SOL into your wallet
          <button
            disabled={loading}
            onClick={() => airDropHelper(setLoading, provider)}
          >
            AirDrop SOL{" "}
          </button>
        </p>
      )}
    </div>
  );
};

export default App;
