export interface User {
    id: string;
    nome: string;
    email: string;
    nome_usuario: string;
    data_nascimento: string;
    created_at: string;
};

export interface CreateUserResponse {
    success: boolean;
    message: string;
    data?: User | null;
}