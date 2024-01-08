'use strict';

const { generateIntId } = require('../helpers/generateIntId.js');

let users = [];

const clear = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const create = (name) => {
  const user = {
    id: generateIntId(),
    name,
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, {
    name,
  });

  return user;
};

const remove = (id) => {
  const newUser = users.filter(user => user.id !== +id);

  users = newUser;
};

module.exports.userService = {
  clear,
  getAll,
  getById,
  create,
  update,
  remove,
};
