'use strict';

let users = [];

const init = () => {
  users = [];
};

const getUsers = () => {
  return users;
};

const getUser = (userId) => {
  return users.find(user => user.id === +userId);
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
