const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.User = db.define(
    "user",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      pronouns: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
      },
      bDay: {
        type: DataTypes.TINYINT,
      },
      bMonth: {
        type: DataTypes.TINYINT,
      },
      bYear: {
        type: DataTypes.SMALLINT,
      },
      discord: {
        type: DataTypes.STRING,
      },
    },
    {
      updatedAt: false,
    }
  );
};
