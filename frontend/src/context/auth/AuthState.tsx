import React, { FC } from "react";
import { AuthContext, LoginUserInput, RegisterUserInput } from "./AuthContext";

interface AuthStateProps {
  children: React.ReactNode;
}

export const AuthState: FC<AuthStateProps> = ({ children }) => {

  const host: string = "http://localhost:8080/api";

  const login = async (user: LoginUserInput) => {

    const { email, password } = user;
    
    const res = await fetch(`${host}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({ email, password }),
    });

    let stat = await res.json();

    if (stat.success) {
      localStorage.setItem("token", stat.token);
      localStorage.setItem("username", stat.username);
      return { success: true, error: null };
    } 
    else {
      return { success: false, error: stat.error };
    }
  };

  const register = async (user: RegisterUserInput) => {

    const { username, email, password } = user;

    const res = await fetch(`${host}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({ username, email, password }),
    });

    let stat = await res.json();

    if (stat.success) {
      localStorage.setItem("token", stat.token);
      localStorage.setItem("username", stat.username);
      return { success: true, error: null };
    }
    else {
      return { success: false, error: stat.error };
    }
  };
  
  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
