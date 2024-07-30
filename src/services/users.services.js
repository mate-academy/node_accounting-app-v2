'use strict';

/**
 *@typedef {Object} User
 *@property {number} id
 *@property {string} name
 *@type {User[] | []}
 */
let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === id) || null;
};

const removeById = (id) => {
  const newUsers = users.filter((user) => user.id !== id);

  const isRemoved = newUsers.length !== users.length || null;

  users = newUsers;

  return isRemoved;
};

const createUser = (name) => {
  const createdId = new Date();

  const newUser = {
    id: createdId.getTime(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateById = (id, name) => {
  const searchedUser = users.find((user) => user.id === id);

  const result = searchedUser ? Object.assign(searchedUser, { name }) : null;

  return result;
};

module.exports = {
  getAll, getById, removeById, createUser, updateById,
};
