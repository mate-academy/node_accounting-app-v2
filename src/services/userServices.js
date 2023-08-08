'use strict';

let users = [];

const init = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getUserById = (userId) => {
  return users.find(user => +user.id === +userId) || null;
};

const create = (name) => {
  const maxId = users.length > 0
    ? Math.max(...users.map(({ id }) => id))
    : 0;

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => +user.id !== +id);
};

const update = (userId, name) => {
  const existingUser = getUserById(userId);

  Object.assign(existingUser, { name });
};

module.exports = {
  init,
  getAll,
  getUserById,
  create,
  update,
  remove,
};
