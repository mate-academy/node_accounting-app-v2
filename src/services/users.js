'use strict';

let users = [];

const getAllUsers = () => {
  return users;
};

const addUser = (name) => {
  const maxId = users.length
    ? Math.max(...users.map(user => user.id))
    : 0;

  const newUser = {
    name,
    id: maxId + 1,
  };

  users.push(newUser);

  return newUser;
};

const getOneUser = (userId) => {
  return users.find(user => user.id === userId);
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const changeUser = (userId, name) => {
  const foundedUser = getOneUser(userId);

  Object.assign(foundedUser, { name });

  return foundedUser;
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  changeUser,
};
