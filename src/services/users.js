'use strict';

let users = [];

const init = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser || null;
};

const create = (name) => {
  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  const filteredUsers = users.filter(user => user.id !== +userId);

  users = filteredUsers;
};

const  update = (userId, name) => {
  const foundUser = getById(userId);

  const updatedUser = Object.assign(foundUser, { name });

  return updatedUser;
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
