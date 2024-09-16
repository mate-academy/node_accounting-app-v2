'use strict';

const users = [];

function getUsers() {
  return users;
};

function getUser(userId) {
  return users.find(u => u.id === +userId);
};

function addUser(newUser) {
  return users.push(newUser);
};

function userIndex(id) {
  return users.findIndex(u => u.id === +id);
};

function deleteUserByIndex(index) {
  return users.splice(index, 1);
};

function updateUserName(index, name) {
  return (
    users[index] = {
      ...users[index],
      name,
    }
  );
}

function clearUsers() {
  return users.splice(0);
};

const usersService = {
  getUsers,
  getUser,
  addUser,
  userIndex,
  deleteUserByIndex,
  updateUserName,
  clearUsers,
  users,
};

module.exports = {
  usersService,
};
