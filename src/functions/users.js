'use strict';

const users = [];

const initUser = () => {
  users.length = 0;
};

const getAllUsers = () => users;

const addUser = (user) => {
  users.push(user);
};

const findUserById = (userId) => users.find(({ id }) => id === userId) || null;

const remove = (userId) => users.filter(({ id }) => id !== userId);

const update = (user, updateData) => {
  Object.assign(user, updateData);
};

const isIncludes = (userId) => users.some(({ id }) => id !== userId);

module.exports = {
  initUser,
  getAllUsers,
  addUser,
  findUserById,
  remove,
  update,
  isIncludes,
};
