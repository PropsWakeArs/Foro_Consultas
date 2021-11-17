/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    static associate(models) {
      Comentario.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario',
        as: 'usuario',
      });
    }
  }

  Comentario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_Come',
    },
    fechaComentario: {
      type: DataTypes.DATE,
      field: 'fch_Come',
      defaultValue: new Date(),
    },
    horaComentario: {
      type: DataTypes.DATE,
      field: 'hra_Come',
      defaultValue: new Date().getTime(),
    },
    temaComentario: {
      type: DataTypes.STRING,
      field: 'tema_Conme',
    },
    comentario: {
      type: DataTypes.STRING,
      field: 'come',
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      field: 'usuarios_id_Boleta',
    },
  },
  {
    sequelize,
    modelName: 'Comentario',
    tableName: 'comentario',
    timestamps: false,
  },
  );

  return Comentario;
};
