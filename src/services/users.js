'use strict';

const users = [];
let countUsersId = 1;

const getAll = () => users;

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const addUser = (name) => {
  const newUser = {
    id: countUsersId,
    name,
  };

  countUsersId++;

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  const foundUserIndex = users.findIndex(user => user.id === userId);
  const deleted = users.splice(foundUserIndex, 1);

  return deleted;
};

const updateUser = (userId, name) => {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
};

module.exports = {
  getAll,
  getUserById,
  addUser,
  removeUser,
  updateUser,
};
