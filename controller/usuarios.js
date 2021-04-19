const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const {primero=0, segundo=0} = req.query;

    res.json({
        msg: "get API - desde controlador",
        primero,
        segundo
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id; // Viene en los params

    res.json({
        msg: "Put API - desde controlador",
        id,
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: "Post API - desde controlador",
        nombre,
        edad
    });

}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "Delete API - desde controlador",
    });
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

