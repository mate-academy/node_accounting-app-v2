'use strict';

let users = [];

const init = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getById = (id) => {
  return users.find((item) => item.id === id) || null;
};

const create = (name) => {
  const user = {
    name,
    id: users.length + 1,
  };

  users.push(user);

  return user;
};

const update = ({ name, id }) => {
  const userToUpdate = getById(id);

  Object.assign(userToUpdate, { name });

  return userToUpdate;
};

const remove = (id) => {
  users = users.filter(item => item.id !== id);
};

module.exports = {
  getAllUsers,
  getById,
  create,
  update,
  remove,
  init,
};
