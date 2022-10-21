'use strict';

function getAll(users) {
  return users;
}

function getById(users, id) {
  const foundUser = users.find((user) => user.id === id);

  return foundUser || null;
}

function createUser(users, name) {
  const newUser = {
    id: Math.random(),
    name,
  };

  users.push(newUser);

  return newUser;
}

function removeUser(users, id) {
  const newUsers = users.filter((user) => user.id !== id);

  return newUsers;
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
  removeUser,
  updateUser,
};
