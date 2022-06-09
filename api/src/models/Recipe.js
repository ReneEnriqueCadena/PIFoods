const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    dishsummary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    punctuation: {
      type: DataTypes.INTEGER,

    },
    healthyfoodlevel: {
      type: DataTypes.INTEGER,
    },
    stepbystep: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    
  });
};

