'use strict';

let users = [];

function getAll() {
  return users;
}

function getOne(userId) {
  const foundUser = users.find(user => (
    user.id === +userId
  ));

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: users.length,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(
    user => user.id !== +userId);
}

function update(id, name) {
  const user = getOne(id);

  Object.assign(user, { name });

  return user;
}

function clear() {
  users = [];
};

module.exports = {
  getAll, getOne, create, remove, update, clear,
};
