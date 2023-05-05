'use strict';

const { v4: uuidv4 } = require('uuid');

let users = [];

function getAllUsers() {
  return users;
};

function addUser(name) {
  const newUser = {
    id: uuidv4(), name,
  };

  users.push(newUser);

  return newUser;
};

function getUser(id) {
  return users.find(el => el.id === id);
}

function deleteUser(id) {
  users = users.filter(el => el.id !== id);

  return true;
}

function updateUser(id, name) {
  users = users.map(el => {
    if (el.id === id) {
      el.name = name;
    }

    return el;
  });

  return true;
};

module.exports = {
  getAllUsers, addUser, getUser, deleteUser, updateUser,
};
