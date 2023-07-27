'use strict';

const { createNewId } = require('../utils/createNewId');

let users = [];

const setInitialUsers = () => {
  users = [];
};

function getAll() {
  return users;
}

function getById(userId) {
  const foundedUser = users.find(user => user.id === userId);

  return foundedUser || null;
}

function create(name) {
  const newUser = {
    id: createNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);

  return users;
}

function update({ userId, name }) {
  const foundedUser = usersService.getById(userId);

  Object.assign(foundedUser, name);

  return foundedUser;
}

const usersService = {
  getAll,
  getById,
  create,
  remove,
  update,
  setInitialUsers,
};

module.exports = { usersService };
