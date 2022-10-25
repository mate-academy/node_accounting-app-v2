'use strict';

let userId = 0;

function getAll(users) {
  return users;
}

function getById(users, id) {
  const foundUser = users.find((user) => user.id === id);

  return foundUser || null;
}

function createUser(users, name) {
  const newUser = {
    id: userId++,
    name,
  };

  users.push(newUser);

  return newUser;
}

function updateUser(name, id, users) {
  const foundUser = users.find((user) => user.id === id);

  if (foundUser) {
    Object.assign(foundUser, { name });

    return foundUser;
  } else {
    return null;
  }
}

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
};
