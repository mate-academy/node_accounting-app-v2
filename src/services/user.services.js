'use strict';

let users = [];

const reset = () => {
  users = [];
};

const getAll = () => {
  return users;
};

const getById = (id) => {
  return users.find((user) => user.id === Number(id)) || null;
};

const create = (name) => {
  const newUser = {
    id: users.length,
    name,
  };

  users.push(newUser);

  return newUser;
};

const update = ({ id, name }) => {
  const user = getById(id);

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  users = users.filter((item) => item.id !== Number(id));
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  update,
  remove,
};
