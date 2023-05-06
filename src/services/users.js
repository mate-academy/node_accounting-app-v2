'use strict';

let users = [];

const getInit = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};

const create = (name) => {
  const max = Math.max(users.map((user) => user.id)) || null;

  const newUser = {
    id: max + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const update = (userId, name) => {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name });
};

module.exports = {
  getInit,
  getAll,
  getById,
  create,
  remove,
  update,
};
