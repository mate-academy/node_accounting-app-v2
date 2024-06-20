const { generateUniqueId } = require('../utils/getRandomId');

let users = [];

const start = () => {
  users = [];
};

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const create = (name) => {
  const newUser = {
    id: generateUniqueId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const update = (id, fields) => Object.assign(getUserById(id), { ...fields });

module.exports = {
  getUsers,
  getUserById,
  create,
  remove,
  update,
  start,
};
