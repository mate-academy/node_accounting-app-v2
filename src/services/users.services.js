'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const add = (newUser) => {
  users.push(newUser);
};

const update = (id, name) => {
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

const clear = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  clear,
  remove,
};
