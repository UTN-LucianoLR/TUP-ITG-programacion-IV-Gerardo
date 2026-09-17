
export const verificarRolAdmin = (req, res, next) => {

    if (!req.usuario) {
        return res.status(500).json({ mensaje: "Error interno. Se intento verificar el rol sin exito" });
    }

    if (req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({ mensaje: "Acceso denegado. Se requiere privilegios de administrador" });
    }

    next();
};