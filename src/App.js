import React, { useState } from "react";
import { airDropHelper } from "./helper/airDrop.helper";
import { initialMintHelper } from "./helper/initialMint.helper";
import { mintAgainHelper } from "./helper/mintAgain.helper";
import { walletConnectionHelper } from "./helper/walletConnection.helper";

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState();

  const [isTokenCreated, setIsTokenCreated] = useState(false);
  const [createdTokenPublicKey, setCreatedTokenPublicKey] = useState(null);
  const [mintingWalletSecretKey, setMintingWalletSecretKey] = useState(null);

  const [supplyCapped, setSupplyCapped] = useState(false);

  return (
    <div>
      <h1>Create your own token using JavaScript</h1>
      {/* Connecting with Phantom Wallet */}
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
      {/* AIR_DROP yourself some SOL */}
      {walletConnected && (
        <p>
          Airdrop 1 SOL into your wallet{" "}
          <button
            disabled={loading}
            onClick={() => airDropHelper(setLoading, provider)}
          >
            AirDrop SOL{" "}
          </button>
        </p>
      )}
      {/* Minting your Tokens */}
      {walletConnected && (
        <p>
          Create your own token
          <button
            disabled={loading}
            onClick={() =>
              initialMintHelper(
                provider,
                setLoading,
                setIsTokenCreated,
                setCreatedTokenPublicKey,
                setMintingWalletSecretKey
              )
            }
          >
            Initial Mint{" "}
          </button>
        </p>
      )}
      {/* Minting more tokens */}
      <div>
        <li>
          Mint More 100 tokens:{" "}
          <button
            disabled={loading || supplyCapped}
            onClick={() =>
              mintAgainHelper(
                provider,
                setLoading,
                createdTokenPublicKey,
                mintingWalletSecretKey
              )
            }
          >
            Mint Again
          </button>
        </li>
      </div>
    </div>
  );
};

export default App;
