import { createContext, useContext, useState } from "react";

const NurseryContext = createContext();

export const useNursery = () => {
  return useContext(NurseryContext);
};

export const NurseryProvider = ({ children }) => {
  const [nurseries, setNurseries] = useState([]);

  return (
    <NurseryContext.Provider value={{ nurseries, setNurseries }}>
      {children}
    </NurseryContext.Provider>
  );
};

export default NurseryContext;
