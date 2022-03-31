import { useHooks } from "@components/providers/web3";

const enhanceHook = (swrRes) => {
  return { ...swrRes, hasInitialResponse: swrRes.data || swrRes.error };
};

export const useNetwork = () => {
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useNetwork)()); //call use network ()
  return {
    network: swrRes,
  };
};

//Fetch all hook functions and return useAccount hook
export const useAccount = () => {
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useAccount)()); //retrieve useAccount from hooks
  return {
    account: swrRes,
  };
};
