'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(({ id }) => id === Number(userId));

  return foundUser || null;
}

function create(name) {
  let newUser = {
    name,
  };

  if (users.length === 0) {
    newUser = {
      id: 1,
      ...newUser,
    };
  } else {
    newUser = {
      id: Math.max(...users.map(({ id }) => id)) + 1,
      ...newUser,
    };
  }

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(({ id }) => id !== Number(userId));
}

function update({ userId, name }) {
  const user = getById(userId);

  Object.assign(user, { name });

  return user;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
