import React, { useState } from "react";
import { airDropHelper } from "./helper/airDrop.helper";

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState();

  const getProvider = async () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    } else {
      window.open("https://www.phantom.app/", "_blank");
    }
  };

  const walletConnectionHelper = async () => {
    if (walletConnected) {
      //Disconnect Wallet
      setProvider();
      setWalletConnected(false);
    } else {
      const userWallet = await getProvider();
      if (userWallet) {
        await userWallet.connect();
        userWallet.on("connect", async () => {
          setProvider(userWallet);
          setWalletConnected(true);
        });
      }
    }
  };

  return (
    <div>
      <h1>Create your own token using JavaScript</h1>
      {walletConnected && (
        <p>
          <strong>Public Key:</strong> {provider.publicKey.toString()}
        </p>
      )}
      <button onClick={walletConnectionHelper} disabled={loading}>
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
