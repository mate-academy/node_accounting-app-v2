'use strict';

let users = [];

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find((user) => user.id === Number(userId));

  return foundUser || null;
}

function create(name) {
  const newId = Math.max(users.map(({ id }) => id)) + 1;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function remove(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function reset() {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
