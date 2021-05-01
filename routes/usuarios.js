const { Router } = require('express');
const { check } = require('express-validator');
const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controller/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(), // sólo valida que sea un objeto id pero no la existencia
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(), // sólo valida que sea un objeto id pero no la existencia
    check('id').custom(existeUsuarioPorID),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch);

module.exports = router;