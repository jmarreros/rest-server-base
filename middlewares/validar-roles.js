const { response } = require("express")

const esAdminRole = ( req, res = response, next) => {

    // leemos la req.usuario que se grabó antes en el otro midleware
    if ( ! req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero',
        });
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROL' ){
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`,
        });
    }

    next();
}

const tieneRol = (...roles) =>{
    return (req, res = response, next) => {
        // leemos la req.usuario que se grabó antes en el otro midleware
        if ( ! req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero',
            });
        }

        if ( ! roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`,
            })
        }

        next();
    }
}
module.exports = {
    esAdminRole,
    tieneRol
}