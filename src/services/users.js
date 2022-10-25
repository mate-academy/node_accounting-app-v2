'use strict';

let users = [];
let countUserId = 1;

function initUser() {
  users = [];
};

function createUsersId(name) {
  const newUser = {
    id: countUserId++,
    name,
  };

  users.push(newUser);

  return newUser;
};

function getUsers() {
  return users;
};

function getUsersId(userId) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

function updateUsersId(userId, name) {
  const foundUser = getUsersId(userId);

  Object.assign(foundUser, { name });

  return foundUser;
};

function deleteUser(userId) {
  users = users.filter(user => (user.id !== +userId));

  return users;
};

function someUser(userId) {
  const findUser = users.some(user => user.id === +userId);

  return findUser;
};

module.exports = {
  getUsersId,
  initUser,
  updateUsersId,
  getUsers,
  createUsersId,
  deleteUser,
  someUser,
};
