'use strict';

let users = [];

const getAll = () => users;

const add = user => {
  users.push(user);
};

const getById = id => (
  users.find(user => user.id === id) || null
);

const remove = id => {
  users = users.filter(user => user.id !== id);
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
  users.length = 0;
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  update,
  clear,
};
