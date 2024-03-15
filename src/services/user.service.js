'use strict';

const users = [];

function restart() {
  users.length = 0;
}

function getAll() {
  return users;
}

function getById(id) {
  return users.find((u) => u.id === id);
}

function create(name) {
  const user = {
    id: users.length + 1,
    name,
  };

  users.push(user);

  return user;
}

function remove(id) {
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return null;
  }

  return users.splice(index, 1);
}

function update(id, name) {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  user.name = name;

  return user;
}

module.exports = {
  restart,
  getAll,
  getById,
  create,
  remove,
  update,
};
