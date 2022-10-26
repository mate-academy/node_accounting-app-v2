'use strict';

let nextUserId = 1;

let users = [];

const getUserData = () => {
  return users;
};

const clearUsersArray = () => {
  users = [];
};

function getUserById(userId) {
  const user = users.find(folk => folk.id === +userId);

  return user || null;
}

function postUser(name) {
  const user = {
    id: nextUserId++,
    name,
  };

  users.push(user);

  return user;
}

function deleteUser(userId) {
  const newUsers = users.filter(folk => folk.id !== +userId);

  users = newUsers;
}

function updateUser(userId, name) {
  const foundUser = getUserById(+userId, users);

  Object.assign(foundUser, { name });

  return foundUser;
}

module.exports = {
  getUserById, postUser, deleteUser, updateUser, getUserData, clearUsersArray,
};
