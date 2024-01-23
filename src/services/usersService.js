'use strict';

const { generatedId } = require('../utils/generatedId');

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  const user = users.find(item => item.id === id);

  return user;
};

const create = (name) => {
  const user = {
    id: generatedId(users),
    name,
  };

  users.push(user);

  return user;
};

const update = ( id, name ) => {
  const user = getById(id);

 user.name = name;

  return user;
};

const remove = (id) => {
  users = users.filter(item => item.id !== id);
};

const resetUser = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  resetUser,
};
