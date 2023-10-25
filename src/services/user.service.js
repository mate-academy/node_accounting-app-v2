'use strict';

const { users } = require('../data/users.js');

const getAll = () => {
  if (users.length === 0) {
    return [];
  }

  return users;
};

const getOne = (id) => {
  const user = users.find((us) => us.id === +id);

  if (!user) {
    return null;
  }

  return user;
};

const addUser = (userName) => {
  const newUser = {
    id: Math.round(Math.random() * 1000000000),
    ...userName,
  };

  users.push(newUser);

  return newUser;
};

const delUser = (index) => {
  return users.splice(index, 1);
};

const editUser = (index, name) => {
  Object.assign(users[index], { name });

  return users[index];
};

module.exports = {
  getAll,
  getOne,
  addUser,
  delUser,
  editUser,
};
