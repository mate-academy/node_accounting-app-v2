const { getId } = require('../helpers/getId');

let users = [];

const initialize = () => {
  users = [];
};

const create = (name) => {
  const user = {
    id: getId(),
    name,
  };

  users.push(user);

  return user;
};

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const update = ({ id, name }) => {
  const user = getUserById(id);

  if (user) {
    user.name = name;
  }

  return user;
};

const remove = (id) => {
  const index = users.findIndex((user) => user.id === Number(id));

  if (index !== -1) {
    users.splice(index, 1);
  }
};

module.exports = {
  initialize,
  create,
  getUsers,
  getUserById,
  update,
  remove,
};
