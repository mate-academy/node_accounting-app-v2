'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (name) => {
  const user = {
    id: users.length + 1,
    name,
  };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clearUsers,
};
