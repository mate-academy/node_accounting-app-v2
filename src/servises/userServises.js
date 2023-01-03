'use strict';

let users = [];

function init() {
  users = [];
}

function getNewId(entity) {
  const maxId = Math.max(...entity.map(el => el.id));

  if (maxId) {
    return 1;
  }

  return maxId + 1;
}

function getAll() {
  return users;
}

function getOne(userId) {
  return users.find(user => user.id === Number(userId));
}

function create(name) {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function update(foundUser, name) {
  foundUser.name = name;

  return foundUser;
}

module.exports = {
  init,
  getAll,
  getOne,
  create,
  remove,
  update,
};
