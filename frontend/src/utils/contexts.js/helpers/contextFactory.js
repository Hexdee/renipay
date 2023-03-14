import { createContext, useContext } from "react";

const createFactory = () => {
  const context = createContext(undefined);

  const useCtx = () => {
    const ctx = useContext(context);
    if (ctx === undefined)
      throw new Error("useContext should be used within a Provider");
    return ctx;
  };

  // a tuple of Context Object and a consumer hook is returned
  return [context, useCtx];
};

export default createFactory;
