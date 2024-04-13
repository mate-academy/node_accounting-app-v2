let users = [];

const { v4: uuidv4 } = require('uuid');

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((item) => item.id === id);
};

const create = (name) => {
  const newUser = {
    id: uuidv4(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const user = users.find((item) => item.id === id);

  if (user) {
    Object.assign(user, { name });
  }

  return user;
};

const remove = (id) => {
  const removedUser = getById(id);

  users = users.filter((item) => item.id !== id);

  return removedUser;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
