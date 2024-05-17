let users = [];
const { newId } = require('../utils/newId');

const reset = () => {
  users = [];

  return users;
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === Number(id));
};

const create = ({ name }) => {
  const user = {
    id: newId(users),
    name,
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
  const index = getById(id);

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
