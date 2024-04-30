import { createContext, useContext } from "react";

const AppContext = createContext("");

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, useAppContext };
