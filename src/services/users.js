'use strict';

let users = [];

const resetUsers = () => {
  users = [];
};

const getAllUsers = () => users;

const getUserById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const addUser = (name) => {
  const ids = users.map(user => user.id);

  const maxId = users.length
    ? Math.max(...ids)
    : 0;

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const updateUser = (userId, name) => {
  const foundUser = getUserById(userId);

  Object.assign(foundUser, { name });
};

module.exports = {
  userService: {
    reset: resetUsers,
    getAll: getAllUsers,
    getUserById: getUserById,
    addUser,
    removeUser,
    updateUser,
  },
};
