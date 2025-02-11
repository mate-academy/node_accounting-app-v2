const { getNewId } = require('../utils/getNewId');

const users = [];

const reset = () => {
  users.length = 0;
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const create = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  const user = getById(id);

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  const index = users.findIndex((user) => user.id === +id);

  if (index !== -1) {
    users.splice(index, 1);

    return true;
  }

  return false;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
