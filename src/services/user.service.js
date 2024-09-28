const { getNewId } = require('../getNewId');

let users = [];

const reset = () => {
  users = [];
};

const get = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id);
};

const create = (name) => {
  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const update = (id, name) => {
  const userToUpdate = getById(id);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

module.exports = {
  reset,
  get,
  getById,
  create,
  remove,
  update,
};
