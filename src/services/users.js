'use strict';

let users = [];

const init = () => {
  users = [];
};

const getUsers = () => users;

const getUser = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const createUser = (name) => {
  const newUser = {
    id: Math.random(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateUser = ({ id, name }) => {
  const userToUpdate = getUser(id);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

module.exports = {
  init,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
