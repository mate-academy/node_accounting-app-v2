'use strict';

function createNewId() {
  return Math.max(...users.map(user => user.id), 0) + 1;
}

let users = [];

function setInitial() {
  users = [];
}

function getAll() {
  return users;
};

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

function create(name) {
  const newUser = {
    id: createNewId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
};

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  setInitial,
  getAll,
  getById,
  create,
  remove,
  update,
};
