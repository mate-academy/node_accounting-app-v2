'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  return users.find(({ id }) => id === userId) || null;
};

const create = (name) => {
  const user = {
    name,
    id: +new Date(),
  };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });
};

const deleteUser = (userId) => {
  users = users.filter(({ id }) => id !== userId) || null;
};

const deleteAllUsers = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteUser,
  deleteAllUsers,
};
