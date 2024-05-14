const getId = require('../utils/createMaxId');
let users = [];

const initUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === Number(id) || null);
};

const createUser = (name) => {
  const user = {
    id: getId.createMaxId(users),
    name,
  };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  users = users.filter((item) => item.id !== Number(id));
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  initUsers,
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
