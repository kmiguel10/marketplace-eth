const {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} = require("react");
//const { useContext } = require("react/cjs/react.production.min");
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

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

  const _web3Api = useMemo(() => {
    //destructurize object - refactoring
    const { web3, provider } = web3Api;

    //return objects
    return {
      ...web3Api,
      isWeb3Loaded: web3 != null,
      getHooks: () => setupHooks(web3),
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: "eth_requestAccounts" });
            } catch {
              console.error("Cannot retrieve account");
              window.location.reload();
            }
          }
        : () =>
            console.log(
              "Cannot connect to Metamask, try to reload your browser."
            ),
    };
  }, [web3Api]);

  return (
    //Wrap child components with context - which we can extract data from without having to pass props
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

//Returns objects from web3
export function useWeb3() {
  return useContext(Web3Context);
}

//Retrieve hooks
export function useHooks(cb) {
  const { getHooks } = useWeb3(); //get all hooks
  return cb(getHooks());
}
