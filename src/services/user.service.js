'use strict';

let users = [];
let currentId = 1;

const getAll = async () => {
  return users;
};

const getById = async (id) => {
  return users.find((user) => user.id === id) || null;
};

const create = async ({ name }) => {
  const newUser = {
    id: currentId++,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = async (id, { name }) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  if (name !== undefined) {
    user.name = name;
  }

  return user;
};

const deleteById = async (id) => {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);

  return true;
};

// Сброс состояния хранилища между тестами
const removeAll = async () => {
  users = [];
  currentId = 1;
};

const usersService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  removeAll,
};

module.exports = {
  usersService,
};
