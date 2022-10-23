'use strict';

let users = [];
let nextUserId = 1;

function getAll() {
  return users;
};

function init() {
  users = [];
}

function getById(id) {
  return users.find(user => user.id === id);
};

function create(name) {
  const newUser = {
    id: nextUserId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(id) {
  users = users.filter(user => user.id !== Number(id));
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function exist(id) {
  users = users.some(user => +user.id === id);
}

module.exports.userService = {
  getAll,
  getById,
  create,
  remove,
  update,
  exist,
  init,
};
