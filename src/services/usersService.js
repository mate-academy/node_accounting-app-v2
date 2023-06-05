'use strict';

let users = [];

function createNewId(params) {
  const arrayOfIds = params.map(param => param.id);

  const maxId = arrayOfIds.length ? Math.max(...arrayOfIds) : 0;

  return maxId + 1;
}

function getAllUsers() {
  return users;
}

function deleteAllUsers() {
  users = [];
}

function findUserById(userId) {
  const requireUser = users.find(user => Number(user.id) === Number(userId));

  return requireUser || null;
}

function createUser(userName) {
  const newUser = {
    id: createNewId(users),
    name: userName,
  };

  users.push(newUser);

  return newUser;
}

function deleteUser(userId) {
  users = users.filter(user => Number(user.id) !== Number(userId));
}

function updateUsers({ userId, name }) {
  const user = findUserById(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAllUsers,
  deleteAllUsers,
  createUser,
  deleteUser,
  updateUsers,
  findUserById,
};
