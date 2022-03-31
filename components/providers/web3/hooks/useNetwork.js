import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3, provider) => () => {
  //using useWSR:
  //1. Create a call back function
  //2. check if web3 exist, if it does then create the name identifier
  //3. create an asyn function to fetch the network id
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId];
    }
  );

  //use useEffect in order to listen for network change and refresh the page
  //check for provider exist and use chainChanged event from metamask and mutate netId
  //extract mutate function from swrResponce where it changes the data (...rest) we'll be receing from it
  useEffect(() => {
    window.ethereum &&
      window.ethereum.on("chainChanged", (chainId) => {
        mutate(NETWORKS[parseInt(chainId, 16)]);
      });
  }, [web3]);

  return {
    network: {
      data,
      mutate,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      ...rest,
    },
  };
};
