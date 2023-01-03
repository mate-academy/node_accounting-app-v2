'use strict';

let users = [];

const clearAll = () => {
  users = [];
};

const getAll = () => users;

const getById = (userId) => {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
};

const addOne = (name) => {
  const newId = users.length
    ? Math.max(...users.map(user => user.id)) + 1
    : 0;

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  return newUser;
};

const deleteOne = (userId) => {
  users = users.filter(user => user.id !== Number(userId));
};

const updateOne = (userId, name) => {
  const foundUser = users.find(user => user.id === Number(userId));

  foundUser.name = name;

  return foundUser;
};

module.exports = {
  clearAll,
  getAll,
  getById,
  addOne,
  deleteOne,
  updateOne,
};
