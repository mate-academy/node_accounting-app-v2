'use strict';

let users = [];

const reset = () => {
  users = [];
};

const getAll = () => {
  return users;
};
const getById = (userId) => {
  const foundUser = users.find(user => user.id === Number(userId));

  return foundUser || null;
};

const addOne = (name) => {
  const maxId = Math.max(...users.map(user => user.id));

  const newUser = {
    id: maxId > 0 ? maxId + 1 : 1,
    name,
  };

  users = [...users, newUser];

  return newUser;
};

const deleteOne = (userId) => {
  users = users.filter(user => user.id !== Number(userId));
};

const updateOne = (userId, name) => {
  const user = getById(userId);

  user.name = name;

  return user;
};

module.exports = {
  getAll,
  getById,
  addOne,
  deleteOne,
  updateOne,
  reset,
};
