'use strict';

let users = [];

const initiate = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => {
  if (isNaN(userId)) {
    throw new Error();
  }

  const foundUser = users.find(user => user.id === userId);

  return foundUser;
};

const update = (userId) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser;
};

const create = (name) => {
  const ids = users.map(user => user.id);

  const newUser = {
    id: Math.max(...ids, 0) + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  initiate,
};
