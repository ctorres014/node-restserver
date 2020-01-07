const jwt = require('jsonwebtoken');

// ======================================
//  Verificar Token
// ======================================
let verificarToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                of: false,
                err
            });
        }

        // Accedemos a la info del usuario
        req.usuario = decoded.usuario;
        next();
    });

};

// ======================================
//  Verificar ADMIN_ROLE
// ======================================
let verificarAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
    next();
}

module.exports = { verificarToken, verificarAdminRole }