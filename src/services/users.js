'use strict';

let users = [];

function getAll() {
  return users;
}

function findUserById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function addOne(name) {
  const maxID = Math.max(...users.map(user => user.id));
  const newUser = {
    id: maxID > 0 ? maxID + 1 : 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateOne(userId, name) {
  const foundUser = findUserById(userId);

  Object.assign(foundUser, { name });

  return foundUser;
}

function deleteOne(userId) {
  const filteredUsers = users.filter(user => user.id !== Number(userId));

  users = filteredUsers;
}

module.exports.usersService = {
  getAll,
  findUserById,
  addOne,
  updateOne,
  deleteOne,
};
