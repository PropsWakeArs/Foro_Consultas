const ComentarioService = require('../services/comentario_service.js');

exports.findAllComentarios = async (req, res) => {
  try {
    const comentarios = await ComentarioService.findAllComentarios();
    res.status(200).json(comentarios);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.createComentario = async (req, res) => {
  const params = Object.keys(req.body);
  const allowParams = ['temaComentario', 'comentario'];

  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    return res.status(400).send({error: 'Invalid params'});
  }
  try {
    const comentario = await ComentarioService.createComentario(
        req.body,
        req.usuario,
    );
    res.status(200).json(comentario);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.deleteComentario = async (req, res) => {
  try {
    await ComentarioService.deleteComentario(req.params.id);
    res.status(202).json();
  } catch (e) {
    res.status(400).json(e);
  }
};
