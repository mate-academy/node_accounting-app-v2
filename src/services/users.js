'use strict';

const genralServices = require('./general.js');

function addUser(users, name) {
  const newUser = {
    id: genralServices.getNextId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateUserById(users, id, name) {
  const userToUpdate = genralServices.getElementById(users, id);

  userToUpdate.name = name;

  return userToUpdate;
}

module.exports = {
  addUser,
  updateUserById,
};
