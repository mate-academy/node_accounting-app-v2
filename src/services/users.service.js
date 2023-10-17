'use strict';

let users = [];

const getUsers = () => {
  return users;
};

const findUser = (id) => {
  return users.find(item => item.id === (+id));
};

const createUser = (name) => {
  const user = {
    id: +(new Date()),
    name,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
};

const updateUser = (user, name) => {
  return Object.assign(user, { name });
};

const clearUsers = () => {
  users.length = 0;
};

const UserServices = {
  getUsers,
  findUser,
  createUser,
  deleteUser,
  updateUser,
  clearUsers,
};

module.exports = {
  UserServices,
};
