const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {// se establece la conxion entre los modelos y las DB
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,//Universal Unique Identifier
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,//id es el campo que identificará de manera única cada registro en la tabla "dogs, no hay duplicados
        allowNull: false// obligatorio y false(no puede tener campos nulos)
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true// valor unico
      },
      min_height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      max_height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      min_weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      max_weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true// es opcional
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }  
    },
    {
      timestamps: false,//indica que la tabla no tendrá columnas de "createdAt" y "updatedAt".
    }// no actualiza fecha y hora de creacion de la tabla 
  );
};
