'use strict';
let users = [];
let usersIdCount = 0;

function resetUsers() {
  users = [];
  usersIdCount = 0;
}

function create(name) {
  usersIdCount++;

  const newUser = {
    id: usersIdCount,
    name,
  };

  users.push(newUser);

  return newUser;
}

function getAll() {
  return users;
}

function getById(userId) {
  return users.find((user) => user.id === Number(userId));
}

function update({ id, name }) {
  const user = getById(id);

  user = {
    ...user,
    name,
  }

  return user;
}

function remove(userId) {
  users = users.filter((user) => user.id !== Number(userId));
}

module.exports = {
  resetUsers,
  create,
  getAll,
  getById,
  update,
  remove,
};
