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
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = (id, body) => {
  const user = getById(id);

  if (!user) {
    return;
  }

  Object.assign(user, body);

  return user;
};

module.exports = {
  getAll,
  add,
  remove,
  getById,
  update,
};
