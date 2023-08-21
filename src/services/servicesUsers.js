'use strict';

let users = [];

const generateId = (arr) => {
  if (arr.length === 0) {
    return 1;
  }

  const ids = arr.map(item => item.id);
  const max = Math.max(...ids);

  return max + 1;
};

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: generateId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== +userId);
}

function update(id, name) {
  const user = getById(id);

  Object.assign(user, {
    name,
  });

  return user;
}

function deleteAll() {
  users = [];
}

module.exports = {
  getAll, getById, create, remove, update, deleteAll,
};
