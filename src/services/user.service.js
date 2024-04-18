const { v4: uuidv4 } = require('uuid');
const users = require('./../createServer');

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((item) => item.id === id);
};

const create = (title) => {
  const item = { name: title, id: uuidv4() };

  users.push(item);

  return item;
};

const remove = (id) => {
  return users.filter((item) => item.id !== id);
};

const change = (id, title) => {
  const user = getById(id);

  user.name = title;

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  change,
};
