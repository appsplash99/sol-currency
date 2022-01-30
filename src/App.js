import React, { useState } from "react";
import { airDropHelper } from "./helper/airDrop.helper";
import { capSupplyHelper } from "./helper/capSupply.helper";
import { initialMintHelper } from "./helper/initialMint.helper";
import { mintAgainHelper } from "./helper/mintAgain.helper";
import { transferTokenHelper } from "./helper/transferToken.helper";
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
      <span>{loading && <>LOADING...</>}</span>

      {/* Connecting with Phantom Wallet */}
      {walletConnected && (
        <li>
          <strong>Public Key:</strong> {provider.publicKey.toString()}
        </li>
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
      <ul>
        {/* AIR_DROP yourself some SOL */}
        {walletConnected && (
          <li>
            Airdrop 1 SOL into your wallet{" "}
            <button
              disabled={loading}
              onClick={() => airDropHelper(setLoading, provider)}
            >
              AirDrop SOL{" "}
            </button>
          </li>
        )}
        {/* Minting your Tokens */}
        {walletConnected && (
          <li>
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
          </li>
        )}
        {/* Minting more tokens */}
        {walletConnected && (
          <li>
            Mint More 100 tokens:{"   "}
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
        )}
        {/* Transferring tokens to your friends */}
        {walletConnected && (
          <li>
            Transfer Token to Friends:{"   "}
            <button
              disabled={loading}
              onClick={() => {
                transferTokenHelper(
                  provider,
                  setLoading,
                  createdTokenPublicKey,
                  mintingWalletSecretKey
                );
              }}
            >
              Transfer 10 Tokens
            </button>
          </li>
        )}
        {/* Capping Token Supply */}
        {walletConnected && (
          <li>
            Cap Token Supply:{"   "}
            <button
              disabled={loading}
              onClick={() =>
                capSupplyHelper(
                  provider,
                  setLoading,
                  setSupplyCapped,
                  createdTokenPublicKey,
                  mintingWalletSecretKey
                )
              }
            >
              Cap Token Supply
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;
