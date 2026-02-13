const { User } = require('../models/User');

let users = [];
let nextUserId = 1;

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === Number(id));
};

const createUser = (name) => {
  const user = new User(nextUserId++, name);

  users.push(user);

  return user;
};

const updateUser = (id, name) => {
  const user = getUserById(id);

  if (user) {
    user.name = name;
  }

  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === Number(id));

  if (index !== -1) {
    users.splice(index, 1);

    return true;
  }

  return false;
};

const clearUsers = () => {
  users = [];
  nextUserId = 1;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  clearUsers,
};
