'use strict';

const uuidv4 = require('uuid').v4;
let users = [];

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find(user => user.id === id) || null;
};

const create = (name) => {
  const user = {
    name,
    id: uuidv4(),
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
  users = users.filter(user => user.id !== id);
};

const updateMany = (usersToUpdate) => {
  for (const { id, name } of usersToUpdate) {
    const user = getById(id);

    if (!user) {
      continue;
    }

    Object.assign(user, { name });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  updateMany,
};
