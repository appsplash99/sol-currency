import {
  Keypair,
  PublicKey,
  Connection,
  Transaction,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const capSupplyHelper = async (
  provider,
  setLoading,
  setSupplyCapped,
  createdTokenPublicKey,
  mintingWalletSecretKey
) => {
  try {
    setLoading(true);
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const createMintingWallet = await Keypair.fromSecretKey(
      Uint8Array.from(Object.values(JSON.parse(mintingWalletSecretKey)))
    );
    const fromAirDropSignature = await connection.requestAirdrop(
      createMintingWallet.publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);

    const creatorToken = new Token(
      connection,
      createdTokenPublicKey,
      TOKEN_PROGRAM_ID,
      createMintingWallet
    );
    await creatorToken.setAuthority(
      createdTokenPublicKey,
      null,
      "MintTokens",
      createMintingWallet.publicKey,
      [createMintingWallet]
    );

    setSupplyCapped(true);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};
