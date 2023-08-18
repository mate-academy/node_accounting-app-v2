'use strict';

const generateId = () => {
  if (users.length < 1) {
    return 1;
  }

  const maxId = Math.max(...users.map(user => user.id));

  return maxId + 1;
};

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  return users.find(user => user.id === userId);
}

function create(name) {
  const newUser = {
    id: generateId(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== userId);
}

function update(userId, name) {
  const foundUser = getById(userId);

  Object.assign(foundUser, { name });
}

function deleteAll() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  deleteAll,
};
