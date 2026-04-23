import { createContext, useState, useContext } from "react";

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider — wraps the whole app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // user = null means logged out
  // user = { username: "admin" } means logged in

  function login(username, password) {
    if (username === "admin" && password === "1234") {
      setUser({ username }); // store user details in context
      return true;
    }else{
        if (username === "bob") {
            setUser({ username : "The one true Bob"});
            return true;
        }

        if (username !== null) {
            setUser({ username : username});
            return true;    
        }
        
        if (password === "4321"){
            setUser({ username: "Generic person number " + Math.floor(Math.random() * 100) + 1})
            return true;
        }
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook so any component can access auth with one line
export function useAuth() {
  return useContext(AuthContext);
}