import { createContext, useContext, useState } from "react";

// de la config
const NurseriesApiContext = createContext();
// de la config
export const useNurseriesApi = () => {
  return useContext(NurseriesApiContext);
};

// ma logique context
export const NurseriesApiProvider = ({ children }) => {
  const [nurseries, setNurseries] = useState([]);

  return (
    <NurseriesApiContext.Provider value={{ nurseries, setNurseries }}>
      {children}
    </NurseriesApiContext.Provider>
  );
};

export default NurseriesApiContext;
