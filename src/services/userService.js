const { createUniqueID } = require('../utils/createUniqueID');

let users = [];

const initUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const createUser = (name) => {
  const user = {
    id: createUniqueID(),
    name,
  };

  users.push(user);

  return user;
};

const updateUser = ({ id, name }) => {
  const user = users.find((usr) => usr.id === Number(id)) || null;

  Object.assign(user, { name });

  return user;
};

const removeUser = (id) => {
  users = users.filter((usr) => usr.id !== Number(id));
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  initUsers,
};
