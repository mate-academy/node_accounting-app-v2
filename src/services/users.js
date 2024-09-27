'use strict';

const { createId } = require('../helpers/createId');

let users = [];

const setInitialUsers = () => {
  users = [];
};

const getAll = () => users;

const findById = (userId) => {
  const findUser = users.find(user => user.id === +userId);

  return findUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: createId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (userId, name) => {
  const userToUpdate = findById(userId);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

module.exports = {
  getAll,
  findById,
  createUser,
  update,
  remove,
  setInitialUsers,
};
