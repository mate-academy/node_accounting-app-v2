const getId = require('../utils/getMaxId');

let users = [];

const initUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getByUserId = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const createUser = (name) => {
  const user = {
    name,
    id: getId.getCreateMaxId(users),
  };

  users.push(user);

  return user;
};

const updateUser = ({ id, name }) => {
  const user = getByUserId(id);

  Object.assign(user, { name });

  return user;
};

const deleteUser = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

module.exports = {
  initUsers,
  getAll,
  getByUserId,
  createUser,
  updateUser,
  deleteUser,
};
