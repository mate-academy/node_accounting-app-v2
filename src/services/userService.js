'use strict';

let users = [];
let nextId = 1;

const getAll = () => users;

const getById = (id) => users.find((u) => u.id === id) || null;

const create = (name) => {
  const user = { id: nextId++, name };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const user = getById(id);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
};

const remove = (id) => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);

  return true;
};

const reset = () => {
  users = [];
  nextId = 1;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
