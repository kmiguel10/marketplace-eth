import { useEffect } from "react";
import useSWR from "swr";

const adminAdresses = {
  "0xf4f5c783d1884d7b8855bb8badae85a93bb428577acc29fa327d2d90dfc8be8b": true,
};

//returns a function
export const handler = (web3, provider) => () => {
  //const [account, setAccount] = useState(null);
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null), //if web3 exist, execute identifier
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      }

      return account;
    }
  );

  //When eth account change
  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);
    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAdresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
