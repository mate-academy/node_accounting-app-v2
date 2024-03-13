'use strict';

let users = [];

const clearUsers = () => {
  users = [];
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
  users = users.filter(user => user.id !== id);
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

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
