'use strict';

let users = [];

function getAll() {
  return [...users];
}

function getById(id) {
  if (!id) {
    return null;
  }

  const foundUser = users.find(user => String(user.id) === id);

  return foundUser || null;
}

function create(name) {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(id) {
  users = users.filter(user => String(user.id) !== id);
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
}

function resetUsers() {
  users = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetUsers,
};
