const { generateId } = require('../utils/utils');

const users = [];

const getAll = () => {
  return users;
};

const getById = (id) => users.find((user) => user.id === +id);

const add = ({ name }) => {
  const newUser = {
    id: generateId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, { name }) => {
  const index = users.findIndex((user) => user.id === +id);

  if (index === -1) {
    return;
  }

  const existing = users[index];
  const updatedUser = {
    ...existing,
    name,
  };

  users[index] = updatedUser;

  return updatedUser;
};

const deleteById = (id) => {
  const index = users.findIndex((user) => user.id === +id);

  if (index === -1) {
    return;
  }

  users.splice(index, 1);

  return true;
};

const clear = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
  clear,
};
