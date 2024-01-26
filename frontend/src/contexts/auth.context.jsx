import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

// méthode utile qui permet à mes composants d'utiliser CE context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isNursery, setIsNursery] = useState(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId, isNursery, setIsNursery }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
