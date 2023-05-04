'use strict';

const { getNewId } = require('../utils/helpers');

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(({ id }) => id === +userId);

  return foundUser;
};

const create = (userBody) => {
  const newUser = {
    id: getNewId(users),
    ...userBody,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(({ id }) => id !== +userId);
};

const update = (userId, userBody) => {
  Object.assign(getById(userId), { ...userBody });
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
