'use strict';

let users = [];

const getInitial = () => {
  users = [];
};

const getAll = () => users;

const getOne = (userId) => {
  const foundUser = users.find(user => user.id === +userId);

  return foundUser;
};

const create = (name) => {
  const newUser = {
    id: new Date().valueOf(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== +userId);
};

const update = ({ id, name }) => {
  const user = getOne(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getInitial,
  getAll,
  getOne,
  create,
  remove,
  update,
};
