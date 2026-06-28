import jwt from 'jsonwebtoken';

// Função middleware para verificar se o usuário está autenticado
// Será usada em rotas que exigem autenticação
export function verifyJWT(req, res, next) {
    console.log('Cookies recebidos na requisição verifyJWT:', req.cookies);
    // Extrair o token do cabeçalho da requisição
    const token = req.cookies?.token;

    // Se não houver token, retorna um erro de acesso negado
    if (!token) {
        return res.status(403).json({
            message: 'Acesso negado. Usuário não autenticado',
        });
    }

    // Se houver token, tente decodificá-lo e anexar o usuário à requisição
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Anexar o usuário decodificado à requisição para uso posterior
        req.user = user;

        // Chamar a próxima função middleware ou rota
        next();
    } catch (err) {
        // Se o token for inválido ou expirado, retorna um erro de acesso negado
        return res.status(403).json({
            message: 'Acesso negado. Usuário não autenticado',
        });
    }
}

// Função middleware para verificar se o usuário está autenticado, mas não retorna erro se não estiver
// Será usada em rotas que podem ser acessadas por usuários autenticados e não autenticados
export function optionalJWT(req, res, next) {
    // 1. Extrair o token do cabeçalho da requisição

    console.log('Cookies recebidos na requisição optionalJWT:', req.cookies);

    const token = req.cookies?.token;

    console.log('Token recebido na requisição optionalJWT:', token);

    // Se não houver token, apenas continue para a próxima função middleware
    if (!token) {
        const user = null;
        return next();
    }

    // Se houver token, tente decodificá-lo e anexar o usuário à requisição
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } catch (err) {
        req.user = null;
    }

    console.log('Usuário autenticado na requisição optionalJWT:', req.user);

    // Se o token for válido, o usuário será anexado à requisição; caso contrário, será definido como null
    
    next();
}
