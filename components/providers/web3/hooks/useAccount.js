import { useEffect } from "react";
import useSWR from "swr";

const adminAdresses = {
  "0xDc5f001CF1F2ED7C0325021A1a6c4a5a0683f6d7": true,
};

//returns a function
export const handler = (web3) => () => {
  //const [account, setAccount] = useState(null);
  const { data, mutate, ...rest } = useSWR(
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
      data,
      isAdmin: (data && adminAdresses[data]) ?? false,
      mutate,
      ...rest,
    },
  };
};
