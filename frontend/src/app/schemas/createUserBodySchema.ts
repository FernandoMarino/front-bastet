import z from "zod";

const createUserBodySchema = z.object({
    email: z.email({ message: "Formato de Email inválido"}).nonempty({ message: "Email é obrigatório" }),
    nome: z.string().nonempty({ message: "Nome é obrigatório" }),
    nome_usuario: z.string().nonempty({ message: "Nome de usuário é obrigatório" }),
    data_nascimento: z.string().nonempty({ message: "Data de nascimento é obrigatória" }),
    senha: z.string().min(6, { message: "A senha deve conter no mínimo 6 caracteres" }).nonempty({ message: "Senha é obrigatória" }),
})
    
export default createUserBodySchema;