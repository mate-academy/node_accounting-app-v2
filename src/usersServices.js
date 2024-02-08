'use strict';

let users = [];

const getUsers = () => {
  return users;
};

const createUser = (name) => {
  if (!name) {
    throw new Error('Name not provided.');
  }

  const newUser = {
    id: Date.now(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const getOneUser = (id) => {
  const wantedUser = users.find((user) => user.id === Number(id));

  if (!wantedUser) {
    throw new Error('User does not exist.');
  }

  return wantedUser;
};

const deleteUser = (id) => {
  const indexToDelete = users.findIndex((user) => user.id === Number(id));

  if (indexToDelete === -1) {
    throw new Error('User does not exist.');
  }

  users.splice(indexToDelete, 1);

  return true;
};

const updateUser = (id, newName) => {
  const userToUpdate = users.find((user) => user.id === Number(id));

  if (!userToUpdate) {
    throw new Error('User does not exist.');
  }

  if (!newName) {
    throw new Error('Name was not provided.');
  }

  Object.assign(userToUpdate, { name: newName });

  return userToUpdate;
};

const resetUsers = () => {
  users = [];
};

const findUser = (id) => {
  const foundUser = users.find((user) => user.id === id);

  return foundUser;
};

module.exports = {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
  resetUsers,
  findUser,
  users,
};
