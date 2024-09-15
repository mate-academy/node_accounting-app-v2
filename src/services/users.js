'use strict';

let users = [];

let newId = users.length;

const getAll = () => {
  return users;
};

const getById = (userId) =>
  users.find((user) => user.id === Number(userId)) || null;

const create = (name) => {
  const newUser = {
    id: newId,
    name,
  };

  newId += 1;

  users.push(newUser);

  return newUser;
};

const updateById = (id, name) => {
  const user = getById(id);

  Object.assign(user, {
    name,
  });

  return user;
};

const removeById = (userId) =>
  (users = users.filter((user) => user.id !== Number(userId)));

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  removeById,
  reset,
};
