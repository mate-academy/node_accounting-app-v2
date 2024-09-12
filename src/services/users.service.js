'use strict';

const users = [];

const clearUsers = () => {
  users.length = 0;
};

const getAll = () => users;

const getById = (id) => users.find(user => user.id === id) || null;

const create = (name) => {
  const id = users.length
    ? users[users.length - 1].id + 1
    : 0;

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users.splice(users.findIndex(user => user.id === id), 1);
};

const update = (id, name) => {
  const user = getById(id);

  if (user) {
    user.name = name;
  }

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clearUsers,
};
