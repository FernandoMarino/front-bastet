import z from "zod";
import { CreateUserFormData } from "../types/CreateUserFormData";

const createUserBodySchema = z.object({
    email: z.email({ message: "Formato de Email inválido"}).nonempty({ message: "Email é obrigatório" }),
    nome: z.string().nonempty({ message: "Nome é obrigatório" }),
    nome_usuario: z.string().nonempty({ message: "Nome de usuário é obrigatório" }),
    data_nascimento: z.string().nonempty({ message: "Data de nascimento é obrigatória" }),
    senha: z.string().min(6, { message: "A senha deve conter no mínimo 6 caracteres" }).nonempty({ message: "Senha é obrigatória" }),
})

export function validateCreateUserFormData(formData: CreateUserFormData) {
    // Validação dos dados do formulário usando o schema Zod
    const validatedFormData = createUserBodySchema.safeParse(formData);

    console.log('validatedFormData:', validatedFormData.success);
    return validatedFormData;
}
    
export default createUserBodySchema;