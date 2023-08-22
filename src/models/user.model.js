const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const User = db.define('user', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },
  role: {
    type: DataTypes.ENUM('normal', 'admin'),
    allowNull: true,
    defaultValue: 'normal',
  },
});

module.exports = User;
