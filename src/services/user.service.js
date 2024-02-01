'use strict';

const { v4: uuid } = require('uuid');

let users = [];

const get = () => {
  return users;
};

const getById = (id) => {
  return users.find(us => us.id === id) || null;
};

const create = (name) => {
  const user = {
    name,
    id: uuid(),
  };

  users.push(user);

  return users;
};

const update = (id, name) => {
  const user = getById(id);

  if (user) {
    Object.assign(user, { name });

    return user;
  }
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
