const { uuidToNumeric } = require('../uuidToNumeric');

let users = [];

const reset = () => {
  users = [];

  return users;
};

const getAll = () => {
  return users;
};

const createUser = (name) => {
  const user = {
    id: uuidToNumeric(),
    name,
  };

  users.push(user);

  return user;
};

const getById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const removeUser = (id) => {
  const newUsers = users.filter((user) => user.id !== +id);

  users = newUsers;
};

const updateUser = (id, name) => {
  const user = getById(id);

  Object.assign(user, { ...name });
};

module.exports = {
  reset,
  getAll,
  getById,
  createUser,
  removeUser,
  updateUser,
};
