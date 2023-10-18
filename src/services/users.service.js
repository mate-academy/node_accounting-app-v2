'use strict';

let users = [];

const getAll = () => {
  return users;
};

const add = user => {
  users.push(user);

  return user;
};

const getById = id => {
  return users.find(user => user.id === id) || null;
};

const remove = id => {
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

const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  updateById,
  clear,
};
