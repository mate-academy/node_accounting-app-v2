'use strict';

let users = [];
let maxUserId = 0;

const clearUsersBeforeStart = () => {
  users = [];
  maxUserId = 0;
};

const getAllUsers = () => {
  return users;
};

const findUserById = (id) => {
  const foundUser = users.find(user => user.id === id);

  return foundUser;
};

const getAllUsersId = () => {
  return users.map(user => +user.id);
};

const createUser = (name) => {
  const newUser = {
    id: maxUserId,
    name: name,
  };

  users.push(newUser);
  maxUserId++;

  return newUser;
};

const updateUser = (id, name) => {
  const user = findUserById(id);

  Object.assign(user, { name });

  return user;
};

const removeUser = (id) => {
  users = users.filter(user => +user.id !== id);
};

module.exports = {
  clearUsersBeforeStart,
  getAllUsers,
  getAllUsersId,
  findUserById,
  createUser,
  updateUser,
  removeUser,
};
