const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
    // const {primero=0, segundo=0} = req.query;
    const {limite=5, desde=0} = req.query;
    const query = {estado: true};

    // Por optimización para ralizar ambas tareas de manera síncrona
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                    .limit(Number(limite))
                    .skip(Number(desde)),
    ]);

    res.json({ total, usuarios });
}

const usuariosPut = async (req, res = response) => {
    const id = req.params.id; // Viene en los params

    // Extramos el _id del cuerpo para que solo funcione con el parámetro
    const { _id, password, google, ...resto } =req.body;

    if ( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({usuario});
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if ( existeEmail ){
    //     return res.status(400).json({
    //         msg: 'El correo ya esta registrado',
    //     });
    // }

    // Encriptar la contraseña
    // Guardar en BD

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(usuario.password, salt);

    await usuario.save();

    res.json({
        msg: "Post API - desde controlador",
        usuario
    });

}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrado físicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    // res.json(usuario);

    // Cambiando el estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "Patch API - desde controlador",
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
}

