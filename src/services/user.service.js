'use strict';

let users = [];

const getUsers = () => users;

const addNewUser = (name) => {
  const newUser = {
    id: Math.floor(Math.random() * 10000),
    name,
  };

  users.push(newUser);

  return newUser;
};

const findUser = (id) => (users.find(
  (user) => user.id === Number(id)));

const findIndex = (id) => (users.findIndex(
  (user) => user.id === Number(id)));

const deleteOneUser = (index) => users.splice(index, 1);

const updateOneUser = ({ userIndex, name }) => {
  users[userIndex].name = name;
};

const makeUsersEmpty = () => {
  users = [];
};

module.exports = {
  getUsers,
  addNewUser,
  findUser,
  findIndex,
  deleteOneUser,
  updateOneUser,
  makeUsersEmpty,
};
