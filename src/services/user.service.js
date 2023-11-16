'use strict';

let users = [];

const clear = () => {
  users = [];
};

const getUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === +id) || null;
};

const postUser = (name) => {
  const user = {
    name,
    id: +new Date(),
  };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  users = users.filter(user => user.id !== +id);
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getUserById,
  getUsers,
  postUser,
  removeUser,
  updateUser,
  clear,
};
