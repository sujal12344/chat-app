import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
