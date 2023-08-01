export const verificar = (req, res, next) => {
    if (req.usuario) {
        let usuario = req.usuario;
        if (usuario.admin) {
            next()
        } else {
            return res.status(403).json({ code: 403, message: "Usted no tiene los permisos necesarios para acceder a este recurso." })
        }
    } else {
        res.status(403).json({code: 403, message: "No se encontró información respecto al usuario."})
    }
}