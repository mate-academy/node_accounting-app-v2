'use strict';

let nextUserId = 1;

function getUserById(userId, users) {
  const user = users.find(folk => folk.id === +userId);

  return user || null;
}

function postUser(name, users) {
  const user = {
    id: nextUserId++,
    name,
  };

  users.push(user);

  return user;
}

function deleteUser(userId, users) {
  return users.filter(folk => folk.id !== +userId);
}

function updateUser(userId, name, users) {
  const foundUser = getUserById(+userId, users);

  Object.assign(foundUser, { name });

  return foundUser;
}

module.exports = {
  getUserById, postUser, deleteUser, updateUser,
};
