'use strict';

let users = [];

const clearUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const currentUser = users.find(user => user.id === userId);

  return currentUser || null;
};

const createUser = (name) => {
  const newId = Math.max(...users.map(({ id }) => id), 0) + 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const update = (userId, name) => {
  const userToUpdate = getById(userId);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

module.exports = {
  clearUsers,
  getAll,
  getById,
  createUser,
  removeUser,
  update,
};
