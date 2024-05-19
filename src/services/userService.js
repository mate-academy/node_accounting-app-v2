const getMaxId = require('../utils/getMaxId');

const users = [];

const reset = () => {
  users.length = 0;
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((person) => person.id === Number(id)) || null;
};

const create = (name) => {
  const user = {
    name,
    id: getMaxId(users),
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  const index = users.findIndex((user) => user.id === Number(id));

  users.splice(index, 1);
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
