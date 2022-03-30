import { useHooks } from "@components/providers/web3";

export const useNetwork = () => {
  return useHooks((hooks) => hooks.useNetwork)(); //call use network ()
};
