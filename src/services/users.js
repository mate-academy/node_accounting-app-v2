'use strict';

let users = [];

function init() {
  users = [];
}

function getAll() {
  return users;
};

function addOne(name) {
  const newUser = {
    id: Math.floor(Math.random()),
    name,
  };

  users.push(newUser);

  return newUser;
};

function getOne(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

function deleteOne(userId) {
  const filteredUsers = users.filter(user => user.id !== +userId);

  users = filteredUsers;
};

function updateOne(userId, name) {
  const foundUser = getOne(userId);

  return {
    ...foundUser,
    name,
  };
};

module.exports = {
  init,
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
