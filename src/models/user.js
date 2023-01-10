/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
'use strict';

const { DataTypes } = require('sequelize');
const { db } = require('../initDB');

const User = db.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'users',
  // timestamps: false,
  createdAt: false,
  updatedAt: false,
});

module.exports = {
  User,
};
