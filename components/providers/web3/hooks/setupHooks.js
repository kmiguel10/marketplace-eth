import { handler as createUseAccount } from "./useAccount";

//accepts web3 as an argument, and returns function
export const setupHooks = (web3) => {
  return {
    useAccount: createUseAccount(web3),
  };
};
