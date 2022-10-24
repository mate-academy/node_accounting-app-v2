'use strict';

let nextUserId = 1;

function getUserById(userId, users) {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
}

function createUser(name, users) {
  const newUser = {
    id: nextUserId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(userId, users) {
  return users.filter(user => user.id !== +userId);
}

function updateUser(userId, name, users) {
  const foundUser = getUserById(userId, users);

  Object.assign(foundUser, { name });

  return foundUser;
}

module.exports = {
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
