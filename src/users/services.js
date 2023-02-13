'use strict';

const users = [];

let id = 0;

const getAll = () => users;

const addUser = (name) => {
  const newId = id++;

  const newUser = {
    name,
    id: newId,
  };

  users.push(newUser);

  return newUser;
};

const getUser = (userId) => {
  return users.find(user => user.id === userId);
};

const deleteUser = (userId) => {
  const foundUser = getUser(userId);

  if (!foundUser) {
    throw new Error('can\'t find a user');
  }

  const index = users.indexOf(foundUser);

  return users.splice(index, 1);
};

const updateUser = (userId, fieldToUpdate) => {
  const foundUser = getUser(userId);

  if (!foundUser) {
    throw new Error('can\'t find a user');
  }

  return Object.assign(foundUser, fieldToUpdate);
};

const resetUsers = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  addUser,
  getUser,
  deleteUser,
  resetUsers,
  updateUser,
};
