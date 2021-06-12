const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login =  async (req, res = response) => {

    const {correo, password} = req.body;

    try{

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if ( ! usuario ){
            res.status(400).json({
                msg: 'Usuario/Password incorreto - correo'
            })
        }
        // Verificar si el usuario esta activo
        if ( ! usuario.estado ){
            res.status(400).json({
                msg: 'Usuario/Password incorreto - estado = false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if ( ! validPassword ){
            res.status(400).json({
                msg: 'Usuario/Password incorreto - password'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        })
    } catch (err){
        console.log(err);
        return res.status(500).json({
            msg:'Error, comunícate con el administrador'
        });
    }

}

module.exports = {
    login
}