import { verificarToken } from '../utils/cript.js';

export function middlewareAuthentication (req, res, next){
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Acesso negado. Token não fornecido."});
    }
    try {
        const decoded = verificarToken(token);
        if(decoded === null) {
            return res.status(403).json({message: "Token inválido ou expirado."})
        }
        req.user = decoded;
        next();
    }
    catch(err) {
        res.status(403).json({message: "Token inválido ou expirado.", err})
    }
}

