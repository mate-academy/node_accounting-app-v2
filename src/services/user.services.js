'use strict';

let users = [];

const getAll = () => users;

const create = (name) => {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const getById = (id) => {
  const userId = Number(id);

  return users.find((user) => user.id === userId) ?? null;
};

const updateById = (id, name) => {
  const userId = Number(id);
  const user = getById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.name = name;

  return user;
};

const removeById = (id) => {
  const userId = Number(id);

  users = users.filter((user) => user.id !== userId);
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  removeById,
  reset,
};
