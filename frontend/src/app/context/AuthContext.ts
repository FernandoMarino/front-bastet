'use client'

import { createContext } from "react";
import { AuthContextType } from "./AuthContextType";


// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;