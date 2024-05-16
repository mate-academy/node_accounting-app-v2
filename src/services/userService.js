const { createUniqueID } = require('../utils/createUniqueID');

let users = [];

const init = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const create = (name) => {
  const user = {
    id: createUniqueID(),
    name,
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = users.find((usr) => usr.id === Number(id)) || null;

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((usr) => usr.id !== Number(id));
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  init,
};
