const {
  getRandomNumberFromUUID,
} = require('../helpers/getRandomNumberFromUUID');

let users = [];

const start = () => {
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
    id: getRandomNumberFromUUID(),
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  start,
};
