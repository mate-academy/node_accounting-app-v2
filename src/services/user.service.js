const { getMaxID } = require('../utils/getMaxID');

let users = [];

const initUsers = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === Number(id));
};

const create = (name) => {
  const user = {
    id: getMaxID(users),
    name,
  };

  users.push(user);

  return user;
};

const update = (user, { name }) => {
  return Object.assign(user, { name });
};

const remove = (id) => {
  users = users.filter((usr) => usr.id !== Number(id));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  initUsers,
};
