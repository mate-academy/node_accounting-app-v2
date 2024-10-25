const { generateId } = require('../utils/generateId');
// eslint-disable-next-line prefer-const
let users = [];

const reset = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((person) => +person.id === +id) || null;
};

const create = (name) => {
  const user = {
    id: generateId(users),
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter((person) => +person.id !== +id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  remove,
  update,
};
