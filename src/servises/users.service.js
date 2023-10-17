'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getUser = (id) => {
  return users.find(item => item.id === +id);
};

const newUser = (name) => {
  const user = {
    id: +new Date().getTime(),
    name,
  };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  users = users.filter(item => item.id !== +id);
};

const clear = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getUser,
  newUser,
  removeUser,
  clear,
};
