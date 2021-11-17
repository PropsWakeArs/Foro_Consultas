const express = require('express');
const {verifyToken} = require('../middleware/auth');
const router = new express.Router();

const ComentarioController = require('../controllers/comentario_controller.js');

const ROOT_PATH = '/api/v1';

router.get(
    ROOT_PATH + '/comentario',
    verifyToken,
    ComentarioController.findAllComentarios,
);

router.post(
    ROOT_PATH + '/comentario',
    verifyToken,
    ComentarioController.createComentario,
);

router.delete(
    ROOT_PATH + '/comentario/:id',
    verifyToken,
    ComentarioController.deleteComentario,
);


module.exports = router;
