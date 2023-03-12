'use strict';

let users = [];

const deleteAllUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const createNew = (name) => {
  const maxId = Math.max(...users.map(user => user.id), 0);
  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteById = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const updateById = (userId, name) => {
  const foundUser = users.find(user => user.id === userId);

  Object.assign(foundUser, { name: name });
};

module.exports = {
  getAll,
  getById,
  createNew,
  deleteById,
  updateById,
  deleteAllUsers,
};
