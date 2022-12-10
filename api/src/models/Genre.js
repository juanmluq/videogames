const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Genre', {
    // No le asigno id porque sequelize por defecto me va agregando el id en numeros enteros: 1 2 3 4...
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
