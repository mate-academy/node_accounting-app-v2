'use strict';

const generateUnicId = require('../utils/generateUnicId');

let users = [];

const getInitiallUsers = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => {
  const foundedUser = users.find(user => user.id === +userId);

  return foundedUser || null;
};

const createOne = (name) => {
  const id = generateUnicId();

  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const updateOne = ({ id, name }) => {
  const foundedUser = getById(id);

  foundedUser.name = name;

  return foundedUser;
};

const deleteOne = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

module.exports = {
  getInitiallUsers,
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
};
