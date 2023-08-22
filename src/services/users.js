'use strict';

const users = [];

function getAll() {
  return users;
}

const getOne = (id) => {
  return users.find((user) => user.id === id);
};

const add = (name) => {
  const newUser = {
    id: Date.now(), name,
  };

  users.push(newUser);

  return newUser;
};

const update = (id, name) => {
  const user = users.find((userToFind) => userToFind.id === id);

  if (!user) {
    return null;
  }

  Object.assign(user, { name });

  return user;
};

const remove = (id) => {
  const startLength = users.length;

  users.splice(users.findIndex((user) => user.id === id), 1);

  return startLength !== users.length;
};

const clearDatabase = () => {
  users.length = 0;
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
  clearDatabase,
};
