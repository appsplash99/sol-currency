import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export const airDropHelper = async (setLoading, provider) => {
  try {
    setLoading(true);
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(provider.publicKey),
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature, {
      commitment: "confirmed",
    });

    console.log(
      `1 SOL airdropped to your wallet ${provider.publicKey.toString()} successfully`
    );
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};
