'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) =>
  users.find((user) => user.id === Number(userId)) || null;

const create = (name) => {
  const id = users.length + 1;

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, {
    name,
  });

  return user;
};

const remove = (userId) =>
  (users = users.filter((user) => user.id !== Number(userId)));

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
