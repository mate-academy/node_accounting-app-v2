// const { v4: uuidv4 } = require('uuid');

let users = [];

const createUser = (name) => {
  const newUser = {
    id: users.length,
    name,
  };

  users.push(newUser);

  return newUser;
};

const resetUsers = () => {
  users = [];
};

const updateUser = (id, name) => {
  const currentUser = getUserById(id);

  Object.assign(currentUser, { name });

  return currentUser;
};
const removeUser = (id) => {
  users = users.filter((user) => user.id !== +id);
};
const getUserById = (id) => {
  return users.find((user) => user.id === +id);
};
const getAllUsers = () => users;

module.exports = {
  createUser,
  resetUsers,
  updateUser,
  removeUser,
  getAllUsers,
  getUserById,
};
