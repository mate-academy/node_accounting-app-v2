'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getOne = (userId) => {
  return users.find(user => user.id === +userId) || null;
};

const create = (userName) => {
  if (userName === undefined || userName.length === 0) {
    return null;
  }

  const newUser = {
    name: userName,
    id: Math.floor(Math.random() * 10000),
  };

  users.push(newUser);

  return newUser;
};

const update = (userName, userId) => {
  if (userName === undefined || userName.length === 0) {
    return 400;
  }

  const indexOfUserToUpdate = users.findIndex(user => user.id === +userId);

  if (indexOfUserToUpdate === -1) {
    return 404;
  }

  const userToUpdate = [...users][indexOfUserToUpdate];
  const usersBeforeUserToUpdate = users.slice(0, indexOfUserToUpdate);
  const usersAfterUserToUpdate = users.slice(indexOfUserToUpdate + 1);

  userToUpdate.name = userName;

  users = [
    ...usersBeforeUserToUpdate,
    userToUpdate,
    ...usersAfterUserToUpdate,
  ];

  return userToUpdate;
};

const deleteById = (userId) => {
  const oldArrUsers = [...users];

  users = users.filter(user => user.id !== +userId);

  if (oldArrUsers.length === users.length) {
    return false;
  }

  return true;
};

const clearAll = () => {
  users = [];
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteById,
  clearAll,
};
