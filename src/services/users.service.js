'use strict';

let users = [];
let lastId = 0;

const clear = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id);
};

const create = ({ name }) => {
  const user = {
    id: ++lastId,
    name,
  };

  users.push(user);

  return user;
};

const remove = (id) => {
  const newUsers = users.filter(user => user.id !== id);
  const isDeleted = newUsers.length !== users.length;

  users = newUsers;

  return isDeleted;
};

const update = (id, name) => {
  const user = users.find(item => item.id === id);

  if (!user) {
    return;
  }
  user.name = name;

  return user;
};

const UserService = {
  getAll,
  getById,
  create,
  remove,
  update,
  clear,
};

module.exports = {
  UserService,
};
