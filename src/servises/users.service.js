'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getUser = (id) => {
  return users.find(item => item.id === Number(id));
};

const addNewUser = (name) => {
  const user = {
    id: +new Date().getTime(),
    name,
  };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  users = users.filter(item => item.id !== Number(id));
};

const updateUser = (id, name) => {
  const user = getUser(id);

  if (!user) {
    return;
  }

  return Object.assign(user, { name });
};

const clear = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getUser,
  addNewUser,
  removeUser,
  clear,
  updateUser,
};
