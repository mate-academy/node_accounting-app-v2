const { data } = require('../data');

const getAll = () => {
  return data.users;
};

const getById = (id) => {
  return data.users.find((user) => user.id === id) || null;
};

const updateUser = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const createUser = (name) => {
  const user = {
    name,
    id: data.nextId++,
  };

  data.users.push(user);

  return user;
};

const deleteUser = (id) => {
  const initialLength = data.users.length;

  data.users = data.users.filter((user) => user.id !== id);

  return data.users.length < initialLength;
};

module.exports = {
  getAll,
  getById,
  updateUser,
  createUser,
  deleteUser,
};
