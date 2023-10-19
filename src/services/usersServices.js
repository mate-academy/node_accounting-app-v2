'use strict';

let users = [];

const getAll = () => {
  return users;
};

const getById = (userId) => {
  return users.find(user => user.id === +userId) || null;
};

const create = (name) => {
  const newUser = {
    id: +new Date(),
    name,
  };

  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const update = (id, name) => {
  const user = getById(id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

const resetUsers = () => {
  users = [];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  resetUsers,
};
