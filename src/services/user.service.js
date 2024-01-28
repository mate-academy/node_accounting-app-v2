'use strict';

let users = [];
let idState = 0;

const getAll = () => users;

const create = (name) => {
  const newUser = {
    id: idState = idState + 1,
    name,
  };

  users.push(newUser);

  return newUser;
};

const findById = (id) => {
  if (!users.some(user => user.id === id)) {
    return null;
  }

  return users.find(user => user.id === id);
};

const remove = (id) => {
  const userToDelete = users.find(user => user.id === id);

  if (!userToDelete) {
    return null;
  }

  return users;
};

const update = (id, name) => {
  const userToUpdate = users.find(user => user.id === id);

  if (!userToUpdate) {
    return null;
  }

  const updatedUser = {
    ...userToUpdate,
    name,
  };

  users.filter(user => user.id !== userToUpdate.id);
  users.push(updatedUser);

  return updatedUser;
};

const reset = () => {
  users = [];
  idState = 0;
};

module.exports = {
  getAll,
  create,
  findById,
  remove,
  update,
  reset,
};
