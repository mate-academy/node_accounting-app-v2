const { getNextAvailableId } = require('../utils/getNextAvailableId');
let users = [];

const clearUsers = () => {
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
    id: getNextAvailableId(users),
    name,
  };

  users.push(user);

  return user;
};

const update = (id, name) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== Number(id));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clearUsers,
};
