const {Comentario} = require('../models/index.js');

const UsuarioService = require('../services/usuario_service.js');

exports.findAllComentarios = async () => {
  return Comentario.findAll({
    include: ['usuario'],
  });
};

exports.createComentario = async (comentario, usuario) => {
  const userExists = await UsuarioService.findUsarioById(usuario.idBoleta);
  if (!userExists) {
    throw new Error('User does not exists');
  }
  comentario.idUsuario = usuario.idBoleta;
  return Comentario.create(comentario);
};


exports.deleteComentario = async (id) => {
  const comentario = await Comentario.findByPk(id);
  if (!comentario) {
    throw new Error('Comentario does not exists');
  }
  await comentario.destroy();
};
