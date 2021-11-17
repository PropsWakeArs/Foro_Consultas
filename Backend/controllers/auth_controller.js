require('dotenv').config();
const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE} = process.env;

const jwt = require('jsonwebtoken');

const UsuarioService = require('../services/usuario_service.js');

const USER_LOGGED_ERROR = 'No user logged in, please log in.';
const TOKEN_INVALID_ERROR = 'Token is not valid, please log in.';
const USER_LOGIN_MESSAGE = 'User logged in succesfuly.';
const USER_LOGOUT_MESSAGE = 'User logged out succesfuly.';
const USER_IS_LOGGEDIN = 'User authenticated and logged in';

exports.singIn = async (req, res) => {
  const {usuario, password} = req.body;
  console.log(usuario, password);

  try {
    const user = await UsuarioService.findUsuarioByCredentials({
      usuario,
      password,
    });

    const token = jwt.sign(
        {
          idBoleta: user.idBoleta.toString(),
        },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_LIFE,
        },
    );
    res.status(200).cookie('token', token, {
      httpOnly: false,
      secure: false,
    }) .json({message: USER_LOGIN_MESSAGE, usuario: user});
  } catch (e) {
    console.log(e);
    res.status(400).json({error: e.message});
  }
};

exports.logout = async (req, res) => {
  res.status(200).clearCookie('token', {
    httpOnly: false,
    secure: false,
  }).json({message: USER_LOGOUT_MESSAGE});
};

exports.check = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(202).json({
        authenticated: false,
        message: USER_LOGGED_ERROR,
      });
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(202).json({
        authenticated: false,
        message: TOKEN_INVALID_ERROR,
      });
    }

    const user = await UsuarioService.findUsarioById(
        decodedToken.idBoleta,
    );
    if (!user) {
      return res.status(202).json({
        authenticated: false,
        message: USER_LOGGED_ERROR,
      });
    }

    res.status(200).json({
      authenticated: true,
      message: USER_IS_LOGGEDIN,
      usuario: user,
    });
  } catch (e) {
    res.status(202).json({
      authenticated: false,
      error: e.message,
    });
  }
};
