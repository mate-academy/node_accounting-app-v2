const getId = require('../utils/getCreateMaxId');
let users = [];

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === parseInt(id) || null);
};

const createUser = (name) => {
  const user = {
    id: getId.getCreateMaxId(users),

    name,
  };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  users = users.filter((item) => item.id !== parseInt(id));
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
