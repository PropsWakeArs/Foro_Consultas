const UsuarioService = require('../services/usuario_service');

exports.findUsuarioByCredentials = async (credentials) => {
  return UsuarioService.findUsuarioByCredentials(credentials);
};

exports.findUsarioById = async (req, res) => {
  try {
    const usuario = await UsuarioService.findUsarioById(req.params.boleta);
    res.status(200).json(usuario);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.findAllUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioService.findAllUsuarios();
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.createUsuario = async (req, res) => {
  const params = Object.keys(req.body);
  const allowParams = [
    'idBoleta',
    'email',
    'pNombre',
    'sNombre',
    'pApellido',
    'sApellido',
    'carrera',
    'passUser',
    'confUser',
  ];

  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    return res.status(400).send({error: 'Invalid params'});
  }

  try {
    const usuario = await UsuarioService.createUsuario(req.body);
    res.status(200).json(usuario);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.updateUsuario = async (req, res) => {
  const params = Object.keys(req.body);
  const allowParams = [
    'idBoleta',
    'email',
    'pNombre',
    'sNombre',
    'pApellido',
    'sApellido',
    'carrera',
    'passUser',
    'confUser',
  ];

  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    return res.status(400).send({error: 'Invalid params'});
  }

  try {
    const user = await UsuarioService.updateUsuario(
        req.params.boleta,
        req.body,
    );
    res.status(202).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    await UsuarioService.deleteUsuario(req.params.boleta);
    res.status(202).json();
  } catch (e) {
    res.status(400).json(e);
  }
};
