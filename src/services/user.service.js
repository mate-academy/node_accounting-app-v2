'use strict';

let users = [];

const init = () => {
  users = [];
};

const getOne = (id) => {
  return users.find((user) => user.id === id) || null;
};

const getAll = () => users;

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
};

const create = (name) => {
  const user = {
    id: users.length + 1,
    name: name,
  };

  users.push(user);

  return user;
};

const update = (id, name) => Object.assign(getOne(id), { name });

module.exports = {
  users,
  init,
  getOne,
  getAll,
  remove,
  create,
  update,
};
