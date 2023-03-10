'use strict';

const { createId } = require('../utils/createId');

let users = [];

const getAll = () => {
  return users;
};

const getOne = (userId) => {
  return users.find(({ id }) => id === +userId);
};

const add = (name) => {
  const newUser = {
    id: createId(users),
    name,
  };

  users = [...users, newUser];

  return newUser;
};

const remove = (userId) => {
  users = users.filter(({ id }) => id !== +userId);
};

const update = (userId, name, requestedUser) => {
  const updatedUser = {
    ...requestedUser,
    name,
  };

  users = users.map((user) => user.id === +userId ? updatedUser : user);

  return updatedUser;
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
