'use strict';

const { generatedId } = require('../utils/generatedId');

let users = [
  // {
  //   id: '1',
  //   name: 'tonia',
  // },
  // {
  //   id: '2',
  //   name: 'anna',
  // },
  // {
  //   id: '4',
  //   name: 'tonia',
  // },
];

const getAll = () => {
  return users;
};

const getById = (id) => {
  const user = users.find(item => item.id === +id) || null;

  return user;
};

const create = (name) => {
  const user = {
    name,
    id: generatedId(users),
  };

  users.push(user);

  return user;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter(item => item.id !== +id);
};

const resetUser = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  resetUser,
};
