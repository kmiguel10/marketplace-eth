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

export const useOwnedCourses = (...args) => {
  const swrRes = useHooks((hooks) => hooks.useOwnedCourses)(...args);

  return {
    ownedCourses: swrRes,
  };
};

//Combined useAccount and useNetwork hooks
export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  const canPurchaseCourse = !!(account.data && network.isSupported);

  return {
    account,
    network,
    canPurchaseCourse,
  };
};
