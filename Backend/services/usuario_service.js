const {Usuario} = require('../models/index.js');

exports.findUsuarioByCredentials = async (credentials) => {
  return Usuario.findByCredentials(credentials);
};

exports.findUsarioById = async (userID) => {
  return Usuario.findByPk(userID);
};

exports.findAllUsuarios = async () => {
  return Usuario.findAll();
};

exports.createUsuario = async (usuario) => {
  const userExist = await this.findUsarioById(usuario.idBoleta);
  if (userExist) {
    throw new Error('User already exists');
  }
  return Usuario.create(usuario);
};

exports.deleteUsuario = async (boletaUsuario) => {
  const user = await this.findUsarioById(boletaUsuario);
  if (!user) {
    throw new Error('User does not exists');
  }
  await user.destroy();
};

exports.updateUsuario = async (boleta, usuario) => {
  const userExist = await Usuario.findByPk(boleta);
  if (!userExist) {
    throw new Error('User does not exists');
  }

  const userConflict = await Usuario.findByPk(usuario.boletaUsuario);
  if (userConflict) {
    throw new Error('Boleta en conflicto');
  }

  // user.idBoleta = usuario.idBoleta;

  return userExist.update(usuario);
};
