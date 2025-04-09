import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/auth/auth";
import { useNavigate } from "react-router-dom";


interface AuthContextType {
  user: { role: string; fullName: string } | null;
  loginUser: (credentials: { email: string; password: string }) => Promise<void>;
  registerUser: (credentials: { email: string; password: string; name: string; surname: string }) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ role: string; fullName: string } | null>(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Błąd parsowania JSON:", error);
        logOut(); 
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => login(credentials),
    onSuccess: (data) => {
      console.log("Logowanie udane:", data);
      const userData = { role: data.userRole, fullName: data.fullName };
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData); 
    },
    onError: (error) => {
      console.error("Błąd logowania:", error);
    },
  });

  
  const registerMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string; name: string; surname: string }) => register(credentials),
    onSuccess: (data) => {
      console.log("Rejestracja udana:", data);
    },
    onError: (error) => {
      console.error("Błąd rejestracji:", error);
    },
  });

  
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser: loginMutation.mutateAsync, 
        registerUser: registerMutation.mutateAsync,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
