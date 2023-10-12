'use strict';

let users = [];

const getAll = () => {
  return users;
};

const add = user => {
  users.push(user);
};

const getById = id => {
  return users.find(user => user.id === id) || null;
};

const removeById = id => {
  users = users.filter(user => user.id !== id);
};

const updateById = (id, name) => {
  const user = getById(id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  add,
  getById,
  removeById,
  updateById,
};
