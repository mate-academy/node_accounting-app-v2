'use strict';

const users = [];

const getAll = () => users;

const generateId = () => {
  return users.length ? users[users.length - 1].id + 1 : 1;
};

const create = (name) => {
  const newUser = {
    id: generateId(),
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

  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
  }
};

const reset = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  removeById,
  reset,
};
