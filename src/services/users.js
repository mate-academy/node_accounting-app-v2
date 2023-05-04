'use strict';

const getNewId = (array) => {
  return array.length
    ? Math.max(...array.map(element => element.id)) + 1
    : 1;
};

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser;
};

const create = (userBody) => {
  const newUser = {
    id: getNewId(users),
    ...userBody,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const update = (userId, userBody) => {
  Object.assign(getById(userId), { ...userBody });
};

const reset = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
