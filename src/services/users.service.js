/* eslint-disable no-console */
const { getItemById, getNewId, getFilteredItems } = require('../utils/utils');

let users = [];

const initialise = () => {
  users = [];
};

const getAll = () => users;

const getOneById = (id) => getItemById(id, users);

const create = (name) => {
  const id = getNewId(users);
  const newUser = {
    id,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const userToUpdate = getOneById(id);

  if (!userToUpdate) {
    return;
  }

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const remove = (id) => {
  users = getFilteredItems(id, users);
};

module.exports = {
  initialise,
  getAll,
  getOneById,
  create,
  update,
  remove,
};
