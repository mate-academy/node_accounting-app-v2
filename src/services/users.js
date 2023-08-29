'use strict';

const { getMaxId } = require('../helpers/getMaxId');

let USERS = [];

const create = (name) => {
  const newUser = {
    name,
    id: getMaxId(USERS) + 1,
  };

  USERS.push(newUser);

  return newUser;
};

const getAll = () => {
  return USERS;
};

const getById = (userId) => {
  return USERS.find(user => user.id === +userId);
};

const remove = (userId) => {
  USERS = USERS.filter(user => user.id !== +userId);
};

const update = (userId, data) => {
  const foundUser = USERS.find(user => user.id === +userId);

  Object.assign(foundUser, data);

  return foundUser;
};

const clear = () => {
  USERS = [];
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  clear,
};
