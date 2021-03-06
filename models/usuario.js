const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre:{
        type: String,
        required: [ true, 'El nombre es requerido' ],
    },
    correo:{
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROL', 'USER_ROL'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
});

usuarioSchema.methods.toJSON = function(){
    const { __v, _id, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);