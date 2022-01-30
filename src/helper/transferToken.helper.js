import {
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const transferTokenHelper = async (
  provider,
  setLoading,
  createdTokenPublicKey,
  mintingWalletSecretKey
) => {
  try {
    setLoading(true);

    /** 1. Initialize Solana Devnet */
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    /** 2. Initialize minting and receivers wallet */
    const createMintingWallet = Keypair.fromSecretKey(
      Uint8Array.from(Object.values(JSON.parse(mintingWalletSecretKey)))
    );
    const receiverWallet = new PublicKey(
      "5eaFQvgJgvW4rDjcAaKwdBb6ZAJ6avWimftFyjnQB3Aj"
    );

    /** 3. AirDrop SOL in minting wallte */
    const fromAirDropSignature = await connection.requestAirdrop(
      createMintingWallet.publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature, {
      commitment: "confirmed",
    });
    console.log("1 SOL airdropped to the wallet for fee");

    /** 4. Initialize accounts of sender and receiver */
    const creatorToken = new Token(
      connection,
      createdTokenPublicKey,
      TOKEN_PROGRAM_ID,
      createMintingWallet
    );
    const fromTokenAccount =
      await creatorToken.getOrCreateAssociatedAccountInfo(provider.publicKey);
    const toTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(
      receiverWallet
    );

    /** 5. Create Transaction Instructions */
    const transaction = new Transaction().add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        provider.publicKey,
        [],
        10000000
      )
    );
    transaction.feePayer = provider.publicKey;
    let blockhashObj = await connection.getRecentBlockhash();
    console.log("blockhashObj", blockhashObj);
    transaction.recentBlockhash = await blockhashObj.blockhash;

    if (transaction) {
      console.log("Txn created successfully");
    }

    /** 6. Sign the transaction with sendor's creds
     * and  then send the transaction to reciever's account
     * to confirm whether transaction took place or not */
    let signed = await provider.signTransaction(transaction);
    let signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);

    console.log("SIGNATURE: ", signature);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};
