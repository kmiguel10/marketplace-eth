import { useAccount } from "./useAccount";

//returns an empty useAccount
const DEFAULT_HOOKS = {
  useAccount: () => ({
    account: "null",
  }),
};

//accepts web3 as an argument, and returns function
export const setupHooks = (web3) => {
  if (!web3) {
    return DEFAULT_HOOKS;
  }
  return {
    useAccount: useAccount(web3),
  };
};
