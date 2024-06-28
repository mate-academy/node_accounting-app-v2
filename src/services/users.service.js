const { v4: uuidv4 } = require('uuid');

const randNumb = () => {
  return +uuidv4().replace(/[^0-9]/g, '');
};

let users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => Number(user.id) === Number(id));
};

const addUserByName = (name) => {
  const user = {
    id: randNumb(),
    name,
  };

  users.push(user);

  return user;
};

const removeUserById = (id) => {
  users = users.filter((user) => +user.id !== +id);

  return users;
};

const updateUserById = (currentUser, name) => {
  return Object.assign(currentUser, { name });
};

const init = () => {
  users = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  addUserByName,
  removeUserById,
  updateUserById,
  users,
  init,
};
