'use strict';

let users = [];

const reset = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const add = (name) => {
  const maxId = Math.max(...users.map(user => user.id), 0);

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const update = (userId, name) => {
  const foundUser = getById(userId);

  Object.assign(foundUser, name);

  return foundUser;
};

module.exports.usersService = {
  reset,
  getAll,
  getById,
  add,
  remove,
  update,
};
