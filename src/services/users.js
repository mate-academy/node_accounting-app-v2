'use strict';

const helpers = require('./helpers.js');

function addUser(users, name) {
  const newUser = {
    id: helpers.getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateUserById(users, id, name) {
  const updatedUser = helpers.getElementById(users, id);

  updatedUser.name = name;

  return updatedUser;
}

// eslint-disable-next-line object-curly-newline
module.exports = { addUser, updateUserById };
