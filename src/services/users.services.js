'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (id, name) => {
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

const clearAll = () => {
  users.splice(0, users.length);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  clearAll,
};
