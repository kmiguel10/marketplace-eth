import { useHooks } from "@components/providers/web3";

//Fetch all hook functions and return useAccount hook
export const useAccount = () => {
  return useHooks((hooks) => hooks.useAccount)(); //retrieve useAccount from hooks
};
