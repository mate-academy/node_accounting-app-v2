/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
'use strict';

const { sequelize } = require('./index');

const { DataTypes } = require('sequelize');

const { Expense } = require('./expenses');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const getUsers = async () => {
  try {
    const users = await User.findAll();

    return users;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

const addUser = async (name) => {
  if (!name) {
    return;
  }

  try {
    const user = await User.create({ name });

    return user;
  } catch (error) {
    console.error(error);
  }
};

const removeUser = async (id) => {
  if (!id) {
    return;
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      return;
    }

    await user.destroy();

    return user;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (id, name) => {
  if (!id || !name) {
    return;
  }

  const user = await getUserById(id);

  if (!user) {
    return null;
  }

  user.name = name;

  await user.save();

  const updatedUser = await getUserById(id);

  return updatedUser;
};

User.hasMany(Expense, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.sync();

module.exports = {
  getUsers,
  removeUser,
  addUser,
  updateUser,
  getUserById,
};
