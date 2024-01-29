'use strict';
/* eslint-disable object-curly-newline */

const { generateNewId } = require('../helpers/generateNewId');

let users = [
  { id: 0, name: 'Alex' },
  { id: 1, name: 'Anna' },
  { id: 2, name: 'Anastasiya' },
  { id: 3, name: 'Mariia' },
];

const getAll = () => users;

const getById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const create = (name) => {
  const newId = generateNewId(users);
  const newUser = { name, id: newId };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const userToUpdate = getById(id);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const remove = (id) => {
  users = users.filter(user => user.id !== +id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
