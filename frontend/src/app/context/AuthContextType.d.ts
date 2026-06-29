import { User } from "../types/User";

// Definição do tipo do contexto de autenticação
export interface AuthContextType {
  user: User | null;
  loading: boolean,
  isAuthenticated: boolean;
  login: (credentials: {identifier: string, password: string}) => Promise<void>;
  logout: () => void;
}

