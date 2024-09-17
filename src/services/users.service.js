'use strict';

let users = [];

const getAll = () => users;

const getById = (id) => {
  return users.find(user => user.id === Number(id)) || null;
};

const add = (user) => users.push(user);

const remove = id => {
  users = users.filter(person => person.id !== Number(id));
};

const update = (id, name) => {
  const user = getById(id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

const clear = () => {
  users = [];
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  update,
  clear,
};
