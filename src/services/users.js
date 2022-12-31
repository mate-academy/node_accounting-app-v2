'use strict';

let users = [];

function clear() {
  users = [];
};

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function addOne(name) {
  const maxId = Math.max(...users.map(user => user.id));

  const newUser = {
    id: maxId > 0 ? maxId + 1 : 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function deleteOne(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function updateOne(userId, name) {
  const user = getById(userId);

  user.name = name;

  return user;
}

module.exports = {
  getAll,
  getById,
  addOne,
  deleteOne,
  updateOne,
  clear,
};
