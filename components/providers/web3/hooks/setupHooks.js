import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";

//accepts web3 as an argument, and returns function
export const setupHooks = (...deps) => {
  return {
    useAccount: createAccountHook(...deps),
    useNetwork: createNetworkHook(...deps),
  };
};
