let users = [];
const { getNewId } = require('../utils/getNewId');

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

const create = (userBody) => {
  const user = {
    id: getNewId(users),
    ...userBody,
  };

  users.push(user);

  return user;
};

const update = (id, updatedUserBody) => {
  const user = getById(id);

  Object.assign(user, updatedUserBody);

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
