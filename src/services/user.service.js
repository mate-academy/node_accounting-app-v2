'use strict';

let users = [];

const clearUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === +id);
};

const create = (name) => {
  const user = {
    id: users.length,
    name,
  };

  users.push(user);

  return user;
};

const update = (user, name) => {
  return Object.assign(user, { name });
};

const remove = (id) => {
  users = users.filter(user => user.id !== +id);
};

module.exports = {
  clearUsers,
  getAll,
  getById,
  create,
  update,
  remove,
};
