const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      readyInMinutes: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
        },
      },
      healthScore: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 0,
          max: 100,
        },
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
