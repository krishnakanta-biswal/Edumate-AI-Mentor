import { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, name?: string) => boolean;
  register: (username: string, password: string, name: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("edumate_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (username: string, password: string, name: string): boolean => {
    const users = JSON.parse(localStorage.getItem("edumate_users") || "{}");
    
    if (users[username]) {
      return false;
    }

    users[username] = { password, name };
    localStorage.setItem("edumate_users", JSON.stringify(users));

    const newUser = { username, name };
    setUser(newUser);
    localStorage.setItem("edumate_user", JSON.stringify(newUser));
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("edumate_users") || "{}");
    
    if (users[username] && users[username].password === password) {
      const loggedInUser = { username, name: users[username].name };
      setUser(loggedInUser);
      localStorage.setItem("edumate_user", JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("edumate_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
