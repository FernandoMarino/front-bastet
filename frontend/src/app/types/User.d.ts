export interface User {
    id: number;
    email: string;
    nome: string;
    nome_usuario: string;
};

export interface CreateUserResponse {
    success: boolean;
    message: string;
    data?: User | null;
}