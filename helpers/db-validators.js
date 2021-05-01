const Usuario = require('../models/usuario');
const Role = require('../models/role');

// Verificar si es un rol válido
const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if ( ! existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en al base de datos`);
    }
}

// Verificar si el correo existe
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail ){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}


// Existe usuario por id
const existeUsuarioPorID = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if ( ! existeUsuario ){
        throw new Error(`El id: ${id} no existe`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
}