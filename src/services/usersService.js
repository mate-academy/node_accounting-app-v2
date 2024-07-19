'use strict';

const users = [];

const init = () => {
  users.length = 0;
};

const generateId = () => {
  return users.length + 1;
};

const getAll = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === +id);
};

const create = (name) => {
  const newUser = {
    id: generateId(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  const userToUpdate = getUserById(id);

  if (userToUpdate) {
    userToUpdate.name = name;

    return userToUpdate;
  }

  return null;
};

const remove = (id) => {
  const index = users.findIndex((user) => user.id === +id);

  if (index > -1) {
    users.splice(index, 1);
  }
};

module.exports = {
  init,
  getAll,
  getUserById,
  create,
  update,
  remove,
};
