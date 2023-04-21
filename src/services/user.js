'use strict';

let users = [];

const resetUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const add = (name) => {
  const maxId = Math.max(...users.map(user => user.id), 0);
  const newId = maxId + 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (userId, name) => {
  const foundUser = getById(userId);

  foundUser.name = name;

  return foundUser;
};

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
  resetUsers,
};
