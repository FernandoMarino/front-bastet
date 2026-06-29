
import { createUserRequest, validateCreateUserFormData } from '../api/usersRequests';
import { CreateUserFormData } from '../types/CreateUserFormData';

export async function createUserAction(
    formData: FormData,
): Promise<{ success: boolean; data?: any; errors?: any; error?: string }> {
    console.log('createUserServerAction - Start');

    const payload: CreateUserFormData = {
        nome: formData.get('nome') as string,
        email: formData.get('email') as string,
        nome_usuario: formData.get('nome_usuario') as string,
        data_nascimento: formData.get('data_nascimento') as string,
        senha: formData.get('senha') as string,
    };

    // Validação dos dados do formulário
    const validatedData = validateCreateUserFormData(payload);

    // Se a validação falhar, retorne os erros para o componente
    if (!validatedData.success) {
        console.error('Validation failed:', validatedData.error);
        return { success: false, errors: validatedData.error.issues };
    }

    // Se a validação for bem-sucedida, prossiga para chamada da API para criar o usuário

    try {
        const response = await createUserRequest(validatedData.data);

        if (!response){
            throw new Error()
        }
        return response.data; // Retorna a resposta da API para o componente
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: 'Ocorreu um erro. Tente novamente mais tarde.' };
    }
}
