'use strict';

let users = [];

const getById = id => (
  users.find(user => user.id === id) || null
);

const getAll = () => users;

const add = user => {
  users.push(user);
};

const update = (id, name) => {
  const user = getById(id);

  if (!user) {
    return;
  }

  Object.assign(user, { name });

  return user;
};

const remove = id => {
  users = users.filter(user => user.id !== id);
};

const clear = () => {
  users.length = 0;
};

module.exports = {
  getById,
  getAll,
  add,
  remove,
  update,
  clear,
};
