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

export const walletConnectionHelper = async (
  setProvider,
  walletConnected,
  setWalletConnected
) => {
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
