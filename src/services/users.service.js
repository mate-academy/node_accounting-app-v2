'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const add = (user) => {
  users.push(user);

  return user;
};

const updateById = (id, name) => {
  const user = getById(id);

  if (!user) {
    return;
  }

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
  add,
  updateById,
  remove,
  clearUsers,
};
