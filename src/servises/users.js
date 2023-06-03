const { v4 } = require('uuid');

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  return users.find(user => user.id === userId) || null;
};

const create = (name) => {
  const newUser = {
    id: v4(),
    name,
  };

  users.push(newUser);
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const edit = (foundUser, name) => {
  Object.assign(foundUser, { name });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
};
