import { useEffect, useState } from "react";

//returns a function
export const handler = (web3) => () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3 && getAccount(); //Call get account if there is web3
  }, [web3]); //re-render when web3 is changed

  //When eth account change
  useEffect(() => {
    window.ethereum &&
      window.ethereum.on("accountsChanged", (accounts) =>
        setAccount(accounts[0] ?? null)
      );
  }, []);

  return {
    account,
  };
};
