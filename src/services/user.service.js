// const { v4 } = require('uuid');
let users = [];
let nextId = 1;

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const updateUser = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const createUser = (name) => {
  const user = {
    name,
    id: nextId++,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  const initialLength = users.length;

  users = users.filter((user) => user.id !== id);

  return users.length < initialLength;
};

const clearUsers = () => {
  users = [];
  nextId = 1;
};

module.exports = {
  getAll,
  getById,
  updateUser,
  createUser,
  deleteUser,
  clearUsers,
};
