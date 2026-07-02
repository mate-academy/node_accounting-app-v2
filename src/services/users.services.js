const { users } = require('../db/users');

const create = (name) => {
  const nextId = Math.max(...users.map((u) => u.id), 0) + 1;
  const newUser = { id: nextId, name };

  users.push(newUser);

  return newUser;
};

const getById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const remove = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  users.splice(userIndex, 1);

  return users;
};

const update = (id, name) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = { id, name };

  return users[userIndex];
};

module.exports = {
  create,
  getById,
  update,
  remove,
};
