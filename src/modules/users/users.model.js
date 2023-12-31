import { DataTypes } from 'sequelize';
import sequelize from '../config/database/database.js';
import { encryptedPassword } from '../config/plugins/encriptedPassword.js';

const User = sequelize.define(
  'users',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('normal', 'admin', 'developer', 'employee'),
      defaultValue: 'normal',
      allowNull: false,
    },
    changedPasswordAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password);
      },
    },
  }
);

export default User;
