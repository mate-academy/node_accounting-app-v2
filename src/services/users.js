'use strict';

const { getId } = require('../utils/createdNewId');

let users = [];

const init = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const create = (name) => {
  const newUser = {
    id: getId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const update = ({ userId, name }) => {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
