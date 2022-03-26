const { createContext, useContext } = require("react");
//const { useContext } = require("react/cjs/react.production.min");

const Web3Context = createContext();

//implement provider here and pass it down to children components
export default function Web3Provider({ children }) {
  return (
    <Web3Context.Provider value={{ test: "Hello" }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
