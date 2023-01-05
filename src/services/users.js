'use strict';

let users = [];

function getUsers() {
  return users;
};

function setUsers(newUserName) {
  let id = 1;

  if (users.length !== 0) {
    id = users[users.length - 1].id + 1;
  }

  const newUser = {
    id,
    name: newUserName,
  };

  users.push(newUser);

  return newUser;
};

function getUserById(userId) {
  return users.find(user => user.id === +userId);
};

function deleteUser(userId) {
  const prevLen = users.length;

  users = users.filter(user => user.id !== +userId);

  return prevLen !== users.length;
};

function updateUser(userId, newData) {
  const foundUser = getUserById(userId);

  if (foundUser) {
    Object.assign(foundUser, newData);

    return foundUser;
  }

  return null;
};

module.exports = {
  getUsers,
  setUsers,
  getUserById,
  deleteUser,
  updateUser,
};
