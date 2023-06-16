'use strict';

let users = [];

const getMax = (array) => {
  if (array.length === 0) {
    return 1;
  }

  const maxId = Math.max(...array.map(({ id }) => id));

  return maxId + 1;
};

function getAll() {
  return users;
}

function getById(userId) {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
}

function create(name) {
  const id = getMax(users);

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
}

function remove(userId) {
  users = users.filter(user => user.id !== Number(userId));
}

function removeMany(ids) {
  if (!ids.every(getById)) {
    throw new Error();
  }
  users = users.filter(user => !ids.includes(user.id));
}

function update({ id, name }) {
  const user = getById(id);

  Object.assign(user, { name });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeMany,
};
