const jwt = require('jsonwebtoken');
const {response, request} = require('express');
const Usuario = require('../models/usuario');
const { usuariosGet } = require('../controller/usuarios');

const validarJWT = async ( req = request, res = response, next) => {
    const token = req.header('x-token');

    if ( ! token ){
        return res.status(401).json({
            msg: 'No exite el token en la petición'
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        // Leer el usuario que corresponde al uid
        // req.usuario = await Usuario.findById(uid);

        const usuarioAuth = await Usuario.findById(uid);

        if ( ! usuarioAuth ){
            return res.status(401).json({
                msg:'Token no válido - usuario no existe en BD'
            })
        }

        // Verifiar si el uid tiene estado = true
        if ( ! usuarioAuth.estado ) {
            return res.status(401).json({
                msg:'Token no válido - usuario con estado false'
            })
        }

        req.usuario = usuarioAuth;

        // pasamos el uid en una nueva propiedad del request
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}