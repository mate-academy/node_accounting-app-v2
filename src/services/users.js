'use strict';

let users = [];

function init() {
  users = [];
};

function getAll() {
  return users;
};

function getbyId(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

function remove(userId) {
  const filteredUsers = users.filter(user => user.id !== +userId);

  users = filteredUsers;
};

function update(userId, name) {
  const foundUser = getbyId(userId);

  const updatedUser = Object.assign(foundUser, { name });

  return updatedUser;
};

module.exports = {
  init,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
