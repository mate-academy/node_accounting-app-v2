'use strict';

let users = [];

const getAll = () => users;

const getById = (id) => users.find(user => user.id === +id) || null;

const add = (data) => {
  const newUser = {
    id: Date.now(),
    ...data,
  };

  users.push(newUser);

  return newUser;
};

const remove = (id) => {
  users = users.filter(user => user.id !== +id);
};

const clean = () => {
  users.length = 0;
};

const update = (id, data) => {
  const user = getById(id);

  Object.assign(user, data);

  return user;
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  clean,
  update,
};
