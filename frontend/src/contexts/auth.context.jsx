import { createContext, useContext, useState, useEffect } from "react";

/* utilitaires */
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

/* Création du contexte */
export const AuthProvider = ({ children }) => {

  /* Valeurs de mon contexte que je souhaite partager entre mes composants */
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isNursery, setIsNursery] = useState(null);
  const [profil, setProfil] = useState(null);

  /* Logs utiles en développement */
  useEffect(() => {
    console.log("token", token);
    console.log("userId", userId);
    console.log("isNursery", isNursery);
    console.log("profil", profil);
  }, [token, userId, isNursery, profil]); // <-- si l'une de ces valeurs change, la fonction "useEffect" se redéclenchera en intégralité.

  /* Exposer le context (et ses valeurs à partager) aux composants */
  return (
    <AuthContext.Provider value={
      {
        token,
        setToken,
        userId,
        setUserId,
        isNursery,
        setIsNursery,
        profil,
        setProfil
      }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
