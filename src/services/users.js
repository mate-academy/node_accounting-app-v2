'use strict';

let users = [];

function reset() {
  users = [];
}

function getAll() {
  return users;
}

function getOne(userId) {
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
  const foundUser = getOne(userId);

  Object.assign(foundUser, { name });

  return foundUser;
}

module.exports.usersService = {
  reset,
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
