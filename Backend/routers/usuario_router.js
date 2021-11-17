const express = require('express');
const {verifyToken} = require('../middleware/auth');
const router = new express.Router();

const UsuarioControllers = require('../controllers/usuario_controller.js');

const ROOT_PATH = '/api/v1';

router.get(
    ROOT_PATH + '/usuario',
    verifyToken,
    UsuarioControllers.findAllUsuarios,
);

router.get(
    ROOT_PATH + '/usuario/:boleta',
    verifyToken,
    UsuarioControllers.findUsarioById,
);


router.post(
    ROOT_PATH + '/usuario',
    verifyToken,
    UsuarioControllers.createUsuario,
);

router.patch(
    ROOT_PATH + '/usuario/:boleta',
    verifyToken,
    UsuarioControllers.updateUsuario,
);

router.delete(
    ROOT_PATH + '/usuario/:boleta',
    verifyToken,
    UsuarioControllers.deleteUsuario,
);

module.exports = router;
