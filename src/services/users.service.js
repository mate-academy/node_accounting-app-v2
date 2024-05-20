const { generateId } = require('../helpers/generateId');

let users = [];

const initUserService = () => {
  users = [];
};

const getUsers = () => {
  return users;
};

const createUser = (user) => {
  const newUser = { ...user, id: generateId() };

  users.push(newUser);

  return newUser;
};

const getUserById = (id) => users.find((u) => u.id === id);

const deleteUser = (id) => {
  users = users.filter((u) => u.id !== id);
};

const updateUser = (id, params) => {
  const updatedUser = { ...getUserById(id), ...params };

  const index = users.findIndex((u) => u.id === id);

  users[index] = updatedUser;

  return updatedUser;
};

const usersService = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};

module.exports = {
  usersService,
  initUserService,
};
