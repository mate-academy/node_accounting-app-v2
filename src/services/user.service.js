'use strict';

const { getNewId } = require('../helpers/getNewId.js');

let users = [];

const getAll = () => {
  return users;
};

const create = (name) => {
  const ids = users.map(currentUser => currentUser.id);

  const user = {
    id: getNewId(ids),
    name,
  };

  users.push(user);

  return user;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const clearUsers = () => {
  users = [];
};

module.exports = {
  userService: {
    getAll,
    create,
    getById,
    remove,
    update,
    clearUsers,
  },
};
