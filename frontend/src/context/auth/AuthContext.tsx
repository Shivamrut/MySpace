import { createContext } from "react";

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  error: string | null;
}

interface AuthContextProps {
  login: (user: LoginUserInput) => Promise<AuthResponse>;
  register: (user: RegisterUserInput) => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
