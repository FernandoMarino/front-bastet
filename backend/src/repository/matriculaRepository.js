import { Matricula } from "../models/index.js";

export async function inserirMatricula(alunoId, cursoId) {
    return await Matricula.create({
        aluno_id: alunoId,
        curso_id: cursoId,
    });
}

export async function buscarMatricula(alunoId, cursoId) {
    return await Matricula.findOne({
        where: {
            aluno_id: alunoId,
            curso_id: cursoId,
        },
    });
}

export async function cancelarMatricula(matriculaId) {
    const result = await Matricula.update({
        status_id: 2, // Definindo o status como "cancelado"
        data_cancelamento: new Date(), // Definindo a data de cancelamento como a data atual
    }, {
        where: {
            id: matriculaId,
        },
    })

    return result;
}
 