'use strict';

let users = [];
let currentId = 0;

const getAll = () => {
  return users;
};

const createUser = (name) => {
  currentId++;

  const newUser = {
    id: currentId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getUserById = (userId) => {
  const findUser = users.find(user => user.id === +userId);

  return findUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const updateUser = (userId, newName) => {
  const findUser = users.find(user => user.id === +userId);

  Object.assign(findUser, { name: newName });

  return findUser;
};

const resetUser = () => {
  users = [];
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  resetUser,
};
