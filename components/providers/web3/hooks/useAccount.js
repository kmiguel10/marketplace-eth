import { useEffect } from "react";
import useSWR from "swr";

//returns a function
export const handler = (web3) => () => {
  //const [account, setAccount] = useState(null);
  const { mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null), //if web3 exist, execute identifier
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  //When eth account change
  useEffect(() => {
    window.ethereum &&
      window.ethereum.on("accountsChanged", (accounts) =>
        mutate(accounts[0] ?? null)
      );
  }, [web3]);

  return {
    account: {
      mutate,
      ...rest,
    },
  };
};
