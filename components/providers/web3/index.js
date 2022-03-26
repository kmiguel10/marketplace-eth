const { createContext, useContext, useState, useEffect } = require("react");
//const { useContext } = require("react/cjs/react.production.min");
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const Web3Context = createContext();

//implement provider here and pass it down to children components
export default function Web3Provider({ children }) {
  //set state
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        //if provider is detected in the browser then initialized web3Api
        const web3 = new Web3(provider); //set web3
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
        });
      } else {
        //even if there is no provider , initialization is still attempted
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please install Metamask...");
      }
    };
    loadProvider();
  }, []); //empty dependency [] to load only once

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
