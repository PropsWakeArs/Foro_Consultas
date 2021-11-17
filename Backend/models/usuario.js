/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasMany(models.Comentario, {
        foreignKey: 'idUsuario',
        as: 'usuarios',
      });
    }
  }

  Usuario.init({
    idBoleta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_Boleta',
    },

    email: {
      type: DataTypes.STRING,
      field: 'e_mail',
    },
    pNombre: {
      type: DataTypes.STRING,
      field: 'pNombre',
    },
    sNombre: {
      type: DataTypes.STRING,
      field: 'sNombre',
    },
    pApellido: {
      type: DataTypes.STRING,
      field: 'pApellido',
    },
    sApellido: {
      type: DataTypes.STRING,
      field: 'sApellido',
    },
    carrera: {
      type: DataTypes.STRING,
      field: 'carrera',
    },
    passUser: {
      type: DataTypes.STRING,
      field: 'pass_user',
    },
    confUser: {
      type: DataTypes.INTEGER,
      field: 'conf_user',
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false,
  },
  );

  /*Usuario.beforeCreate(async (usuario) => {
    console.log("Create");
    console.log(usuario.passUser);
    if (usuario.passUser) {
      usuario.passUser = await bcrypt.hash(usuario.passUser, 8);
    }
  });*/

  Usuario.beforeSave(async (usuario) => {
    console.log("safe");
    console.log(usuario.passUser);
    if (usuario.passUser) {
      usuario.passUser = await bcrypt.hash(usuario.passUser, 8);
    }
  });

  Usuario.findByCredentials = async (credentials) => {
    const usario = await Usuario.findOne({
      where: {
        idBoleta: credentials.usuario,
      },
    });
    if (!usario) {
      throw new Error('usuario');
    }
    console.log(credentials);
    console.log(usario.passUser);
    const match = await bcrypt.compare(credentials.password,usario.passUser);
    console.log(match);
    if (!match) {
      throw new Error('contraseña');
    }
    return usario;
  };

  return Usuario;
};
