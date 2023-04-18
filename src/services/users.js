'use strict';

let users = [];

const clearUsers = () => {
  users = [];
};

const getAll = () => users;

const findById = (userId) => {
  return users.find(user => user.id === userId);
};

const create = (name) => {
  const maxId = users.length
    ? Math.max(...users.map(({ id }) => id))
    : 0;

  const newUser = {
    id: maxId + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== id);
};

const update = (fieldsToUpdate, userToUpdate) => {
  return Object.assign(userToUpdate, { ...fieldsToUpdate });
};

module.exports = {
  getAll,
  clearUsers,
  findById,
  create,
  remove,
  update,
};
